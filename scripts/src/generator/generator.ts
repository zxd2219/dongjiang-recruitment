/* eslint-disable */
import inquirer from "inquirer";
import { execSync } from "node:child_process";
import {
  constants,
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { relative, resolve } from "node:path";

interface Package {
  name: string;
  version: string;
  path: string;
  private: boolean;
}

const copy = (sd: string, td: string) => {
  // 读取目录下的文件，返回文件名及文件类型{name: 'xxx.txt, [Symbol(type)]: 1 }
  const sourceFile = readdirSync(sd, { withFileTypes: true });
  for (const file of sourceFile) {
    // 源文件 地址+文件名
    const srcFile = resolve(sd, file.name);
    // 目标文件
    const tagFile = resolve(td, file.name);
    // 文件是目录且未创建
    if (file.isDirectory() && !existsSync(tagFile)) {
      mkdirSync(tagFile);
      copy(srcFile, tagFile);
    } else if (file.isDirectory() && existsSync(tagFile)) {
      // 文件时目录且已存在
      copy(srcFile, tagFile);
    } else {
      copyFileSync(srcFile, tagFile, constants.COPYFILE_FICLONE);
    }
  }
};

const replaceFileName = (dir: string, from: string, to: string) => {
  // 读取目录下的文件，返回文件名及文件类型{name: 'xxx.txt, [Symbol(type)]: 1 }
  const sourceFile = readdirSync(dir, { withFileTypes: true });
  for (const file of sourceFile) {
    // 源文件 地址+文件名
    const srcFile = resolve(dir, file.name);
    // 目标文件
    const tagFile = srcFile.replace(new RegExp(from, "g"), to);
    // 文件是目录且未创建
    if (file.isDirectory()) {
      replaceFileName(srcFile, from, to);
    } else {
      copyFileSync(srcFile, tagFile, constants.COPYFILE_FICLONE);
      if (srcFile !== tagFile) rmSync(srcFile);
    }
  }
};

const replaceFileContent = (dir: string, from: string, to: string) => {
  const sourceFile = readdirSync(dir, { withFileTypes: true });
  for (const file of sourceFile) {
    const srcFile = resolve(dir, file.name);
    if (file.isDirectory()) {
      replaceFileContent(srcFile, from, to);
    } else {
      const content = readFileSync(srcFile).toString();
      const newContent = content.replace(new RegExp(from, "g"), to);
      writeFileSync(srcFile, newContent);
    }
  }
};

const branch = execSync("echo -n $(git symbolic-ref --short -q HEAD)");
let filter = process.argv[2];
try {
  execSync("git log");
  filter ||= `@dongjiang-recruitment/**[${branch.toString()}]`;
} catch (error) {
  filter ||= `@dongjiang-recruitment/**`;
}

const packages = (
  JSON.parse(
    execSync(`pnpm m ls --json --depth=-1 --filter "${filter}"`).toString() ||
      "[]"
  ) as Array<Package>
).map(({ path }) => relative(process.cwd(), path));

packages.length &&
  inquirer
    .prompt([
      {
        name: "您想要使用的API模板层级",
        type: "list",
        choices: ["first(顶层资源)", "second(次级资源)"],
      },
      {
        name: "资源名称",
        type: "input",
        when: (answers) =>
          answers["您想要使用的API模板层级"] === "first(顶层资源)",
      },
      {
        name: "顶层资源名称",
        type: "input",
        when: (answers) =>
          answers["您想要使用的API模板层级"] === "second(次级资源)",
      },
      {
        name: "次级资源名称",
        type: "input",
        when: (answers) =>
          answers["您想要使用的API模板层级"] === "second(次级资源)",
      },
    ])
    .then((answers) => {
      if (answers["您想要使用的API模板层级"] === "first(顶层资源)") {
        const resourceName = answers["资源名称"];
        const firstCharLowercaseResourceName = `${resourceName
          .slice(0, 1)
          .toLowerCase()}${resourceName.slice(1)}`;

        if (
          existsSync(
            resolve(process.cwd(), `src/${firstCharLowercaseResourceName}`)
          )
        ) {
          console.log("目录已存在");
          return;
        } else {
          mkdirSync(
            resolve(process.cwd(), `src/${firstCharLowercaseResourceName}`)
          );
        }
        copy(
          resolve(__dirname, "templates/first"),
          resolve(process.cwd(), `src/${firstCharLowercaseResourceName}`)
        );
        replaceFileName(
          resolve(process.cwd(), `src/${firstCharLowercaseResourceName}`),
          "first",
          firstCharLowercaseResourceName
        );
        replaceFileContent(
          resolve(process.cwd(), `src/${firstCharLowercaseResourceName}`),
          "First",
          resourceName
        );
        replaceFileContent(
          resolve(process.cwd(), `src/${firstCharLowercaseResourceName}`),
          "first",
          firstCharLowercaseResourceName
        );
      }
      if (answers["您想要使用的API模板层级"] === "second(次级资源)") {
        const firstResourceName = answers["顶层资源名称"];
        const fCLResourceName = `${firstResourceName
          .slice(0, 1)
          .toLowerCase()}${firstResourceName.slice(1)}`;
        const secondResourceName = answers["次级资源名称"];
        const fCLSecondResourceName = `${secondResourceName
          .slice(0, 1)
          .toLowerCase()}${secondResourceName.slice(1)}`;

        if (
          existsSync(resolve(process.cwd(), `src/${fCLSecondResourceName}`))
        ) {
          console.log("目录已存在");
          return;
        } else {
          mkdirSync(resolve(process.cwd(), `src/${fCLSecondResourceName}`));
        }
        copy(
          resolve(__dirname, "templates/second"),
          resolve(process.cwd(), `src/${fCLSecondResourceName}`)
        );
        replaceFileName(
          resolve(process.cwd(), `src/${fCLSecondResourceName}`),
          "second",
          fCLSecondResourceName
        );
        replaceFileContent(
          resolve(process.cwd(), `src/${fCLSecondResourceName}`),
          "First",
          firstResourceName
        );
        replaceFileContent(
          resolve(process.cwd(), `src/${fCLSecondResourceName}`),
          "first",
          fCLResourceName
        );
        replaceFileContent(
          resolve(process.cwd(), `src/${fCLSecondResourceName}`),
          "Second",
          secondResourceName
        );
        replaceFileContent(
          resolve(process.cwd(), `src/${fCLSecondResourceName}`),
          "second",
          fCLSecondResourceName
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
