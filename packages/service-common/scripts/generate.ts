/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { execSync } from "node:child_process";
import {
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";

const json = JSON.parse(readFileSync("openapi.json").toString());

const fix = (json: { [x: string]: any }) => {
  const keys = Object.keys(json);
  if (keys.some((key) => key === "x-apifox")) {
    json["x-enum-varnames"] = Object.values(
      json["x-apifox"]["enumDescriptions"]
    );
    const patchedDescription = `，eg；{${Object.entries(
      json["x-apifox"]["enumDescriptions"]
    )
      .map(([key, value]) => `${key}:${value}`)
      .join(",")}}`;
    if (!json["description"]?.includes(patchedDescription)) {
      json["description"] = `${json["title"]}${patchedDescription}`;
    }
  } else {
    for (const key of keys) {
      if (typeof json[key] === "object" && json[key] !== null) {
        fix(json[key]);
      }
    }
  }
  if (
    keys.some((key) => key === "title") &&
    !keys.some((key) => key === "description")
  ) {
    json["description"] = json["title"];
  }
};

fix(json);

writeFileSync("openapi.json", JSON.stringify(json, null, 2));
execSync("pnpm prettier --write openapi.json");

existsSync("src/request") && rmSync("src/request", { recursive: true });
existsSync("types") && rmSync("types", { recursive: true });
existsSync("dist") && rmSync("dist", { recursive: true });
execSync(
  "pnpm openapi -i openapi.json -o src/request -c axios --name ApiClient --useOptions --exportSchemas true"
);

type Replaces = Array<{
  matcher: RegExp;
  replace: string;
  import?: string;
}>;

const getPlaceholder = (
  replace: string
): Array<{
  name: string;
  position: number;
}> => {
  const match = /\$(\d)/g.exec(replace);
  if (match === null) return [];
  return [{ name: match[0], position: +match[1] }].concat(
    getPlaceholder(replace.replace(match[0], ""))
  );
};

// 找到第一个IMPORT的位置
const getFirstImport = (content: string): number => {
  const match = /import/g.exec(content);
  if (match === null) return 0;
  return content.indexOf(match[0]);
};
let index = 0;
const replace = (content: string, replaces: Replaces, deep = 1): string => {
  const replaceMatchResults = replaces.map(({ matcher }) => {
    const matchResults = [];
    while (true) {
      const matchResult = matcher.exec(content);
      if (matchResult === null) break;
      matchResults.push(matchResult);
    }
    return matchResults;
  });
  // 如果所有的匹配结果都是空数组，说明没有匹配到，直接返回
  if (replaceMatchResults.every((matchResults) => matchResults.length === 0))
    return content;
  return replaceMatchResults.reduce(
    (content, matchResults, index) =>
      matchResults.reduce((content, matchResult) => {
        if (matchResult === null) return content;
        if (
          replaces[index].import &&
          !content.includes(replaces[index].import!) &&
          deep === 1
        ) {
          const firstLine = getFirstImport(content);
          content = `${content.slice(0, firstLine)}${
            replaces[index].import
          }\n${content.slice(firstLine)}`;
        }
        const replaceContent = getPlaceholder(replaces[index].replace).reduce(
          (replace, { name, position }) =>
            replace.replace(name, matchResult[position]),
          replaces[index].replace
        );
        content = content.replace(matchResult[0], replaceContent);
        return content;
      }, content),
    content
  );
};

const servicesReplaces: Replaces = [
  {
    matcher:
      /(query\?: )string(,[\s\S]*?sort\?: )Array<string>(,\n\s*\}\): CancelablePromise<\{[\s\S]*?body: \{[\s\S]*?: Array<)(\w.*?)(>;)/g,
    replace: `$1Query<$4>$2Sort<$4>$3$4$5`,
    import: `import type { Query, Sort } from "../../interfaces"`,
  },
  {
    matcher: /CancelablePromise<\{[\s\S]*?body: ([\s\S]*?);\n\s*?\}>( \{)/gi,
    replace: "CancelablePromise<$1>$2",
  },
];
const servicesPath = "src/request/services";
const services = readdirSync(servicesPath);
for (const service of services) {
  const servicePath = `${servicesPath}/${service}`;
  const serviceContent = readFileSync(servicePath).toString();
  writeFileSync(servicePath, replace(serviceContent, servicesReplaces));
}

const coresReplaces: Replaces = [
  {
    matcher: /resolve\(result.body\)/g,
    replace: "resolve(result.body.body ?? result.body)",
  },
  {
    matcher:
      /Object\.entries\(value\)\.forEach\(\(\[k, v\]\) => \{\n\s*process\(`\$\{key\}\[\$\{k\}\]`, v\);\n\s*\}\);/g,
    replace: `if (key === "query") {\nprocess("query", JSON.stringify(value));\n} else {$0}`,
  },
];
const coresPath = "src/request/core";
const cores = readdirSync(coresPath);
for (const core of cores) {
  const corePath = `${coresPath}/${core}`;
  const coreContent = readFileSync(corePath).toString();
  writeFileSync(corePath, replace(coreContent, coresReplaces));
}

execSync("pnpm prettier --write src/request");
