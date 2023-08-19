"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
const inquirer_1 = __importDefault(require("inquirer"));
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const copy = (sd, td) => {
  // 读取目录下的文件，返回文件名及文件类型{name: 'xxx.txt, [Symbol(type)]: 1 }
  const sourceFile = (0, node_fs_1.readdirSync)(sd, { withFileTypes: true });
  for (const file of sourceFile) {
    // 源文件 地址+文件名
    const srcFile = (0, node_path_1.resolve)(sd, file.name);
    // 目标文件
    const tagFile = (0, node_path_1.resolve)(td, file.name);
    // 文件是目录且未创建
    if (file.isDirectory() && !(0, node_fs_1.existsSync)(tagFile)) {
      (0, node_fs_1.mkdirSync)(tagFile);
      copy(srcFile, tagFile);
    } else if (file.isDirectory() && (0, node_fs_1.existsSync)(tagFile)) {
      // 文件时目录且已存在
      copy(srcFile, tagFile);
    } else {
      (0, node_fs_1.copyFileSync)(
        srcFile,
        tagFile,
        node_fs_1.constants.COPYFILE_FICLONE
      );
    }
  }
};
const replaceFileName = (dir, from, to) => {
  // 读取目录下的文件，返回文件名及文件类型{name: 'xxx.txt, [Symbol(type)]: 1 }
  const sourceFile = (0, node_fs_1.readdirSync)(dir, { withFileTypes: true });
  for (const file of sourceFile) {
    // 源文件 地址+文件名
    const srcFile = (0, node_path_1.resolve)(dir, file.name);
    // 目标文件
    const tagFile = srcFile.replace(new RegExp(from, "g"), to);
    // 文件是目录且未创建
    if (file.isDirectory()) {
      replaceFileName(srcFile, from, to);
    } else {
      (0, node_fs_1.copyFileSync)(
        srcFile,
        tagFile,
        node_fs_1.constants.COPYFILE_FICLONE
      );
      if (srcFile !== tagFile) (0, node_fs_1.rmSync)(srcFile);
    }
  }
};
const replaceFileContent = (dir, from, to) => {
  const sourceFile = (0, node_fs_1.readdirSync)(dir, { withFileTypes: true });
  for (const file of sourceFile) {
    const srcFile = (0, node_path_1.resolve)(dir, file.name);
    if (file.isDirectory()) {
      replaceFileContent(srcFile, from, to);
    } else {
      const content = (0, node_fs_1.readFileSync)(srcFile).toString();
      const newContent = content.replace(new RegExp(from, "g"), to);
      (0, node_fs_1.writeFileSync)(srcFile, newContent);
    }
  }
};
const branch = (0, node_child_process_1.execSync)(
  "echo -n $(git symbolic-ref --short -q HEAD)"
);
let filter = process.argv[2];
try {
  (0, node_child_process_1.execSync)("git log");
  filter ||= `@dongjiang-recruitment/**[${branch.toString()}]`;
} catch (error) {
  filter ||= `@dongjiang-recruitment/**`;
}
const packages = JSON.parse(
  (0, node_child_process_1.execSync)(
    `pnpm m ls --json --depth=-1 --filter "${filter}"`
  ).toString() || "[]"
).map(({ path }) => (0, node_path_1.relative)(process.cwd(), path));
packages.length &&
  inquirer_1.default
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
          (0, node_fs_1.existsSync)(
            (0, node_path_1.resolve)(
              process.cwd(),
              `src/${firstCharLowercaseResourceName}`
            )
          )
        ) {
          console.log("目录已存在");
          return;
        } else {
          (0, node_fs_1.mkdirSync)(
            (0, node_path_1.resolve)(
              process.cwd(),
              `src/${firstCharLowercaseResourceName}`
            )
          );
        }
        copy(
          (0, node_path_1.resolve)(__dirname, "templates/first"),
          (0, node_path_1.resolve)(
            process.cwd(),
            `src/${firstCharLowercaseResourceName}`
          )
        );
        replaceFileName(
          (0, node_path_1.resolve)(
            process.cwd(),
            `src/${firstCharLowercaseResourceName}`
          ),
          "first",
          firstCharLowercaseResourceName
        );
        replaceFileContent(
          (0, node_path_1.resolve)(
            process.cwd(),
            `src/${firstCharLowercaseResourceName}`
          ),
          "First",
          resourceName
        );
        replaceFileContent(
          (0, node_path_1.resolve)(
            process.cwd(),
            `src/${firstCharLowercaseResourceName}`
          ),
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
          (0, node_fs_1.existsSync)(
            (0, node_path_1.resolve)(
              process.cwd(),
              `src/${fCLSecondResourceName}`
            )
          )
        ) {
          console.log("目录已存在");
          return;
        } else {
          (0, node_fs_1.mkdirSync)(
            (0, node_path_1.resolve)(
              process.cwd(),
              `src/${fCLSecondResourceName}`
            )
          );
        }
        copy(
          (0, node_path_1.resolve)(__dirname, "templates/second"),
          (0, node_path_1.resolve)(
            process.cwd(),
            `src/${fCLSecondResourceName}`
          )
        );
        replaceFileName(
          (0, node_path_1.resolve)(
            process.cwd(),
            `src/${fCLSecondResourceName}`
          ),
          "second",
          fCLSecondResourceName
        );
        replaceFileContent(
          (0, node_path_1.resolve)(
            process.cwd(),
            `src/${fCLSecondResourceName}`
          ),
          "First",
          firstResourceName
        );
        replaceFileContent(
          (0, node_path_1.resolve)(
            process.cwd(),
            `src/${fCLSecondResourceName}`
          ),
          "first",
          fCLResourceName
        );
        replaceFileContent(
          (0, node_path_1.resolve)(
            process.cwd(),
            `src/${fCLSecondResourceName}`
          ),
          "Second",
          secondResourceName
        );
        replaceFileContent(
          (0, node_path_1.resolve)(
            process.cwd(),
            `src/${fCLSecondResourceName}`
          ),
          "second",
          fCLSecondResourceName
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
