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

const replace = (content: string): string => {
  const matchResult =
    /(query\?: )string(,[\s\S]*?sort\?: Array<)string(>,\n\s*\}\): CancelablePromise<\{[\s\S]*?body: \{[\s\S]*?: Array<)(\w.*?)(>;)/g.exec(
      content
    );
  if (!matchResult) return content;
  return replace(
    content.replace(
      matchResult[0],
      `${matchResult[1]}Query<${matchResult[4]}>${matchResult[2]}\`\${keyof ${matchResult[4]}},\${"asc" | "desc"}\`${matchResult[3]}${matchResult[4]}${matchResult[5]}`
    )
  );
};

const servicesPath = "src/request/services";
const services = readdirSync(servicesPath);
for (const service of services) {
  const servicePath = `${servicesPath}/${service}`;
  const serviceContent = readFileSync(servicePath).toString();
  const splitResult = replace(serviceContent).split("\n");
  splitResult.splice(
    2,
    1,
    `${splitResult[2]}\nimport type { Query } from "../../interfaces";`
  );
  writeFileSync(servicePath, splitResult.join("\n"));
}

execSync("pnpm prettier --write src/request");
