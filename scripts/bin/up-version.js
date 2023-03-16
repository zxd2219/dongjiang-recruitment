"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const globalPackage = JSON.parse(
  (0, node_child_process_1.execSync)(
    `pnpm m ls --json --depth=-1 --filter "dongjiang-recruitment"`
  ).toString() || "[]"
);
const subPackages = JSON.parse(
  (0, node_child_process_1.execSync)(
    `pnpm m ls --json --depth=-1 --filter "@dongjiang-recruitment/**"`
  ).toString() || "[]"
);
console.log(`当前版本号: ${globalPackage[0].version}`);
const changeAllPackagesVersion = (version) => {
  const packageJson = JSON.parse(
    (0, node_fs_1.readFileSync)(
      `${globalPackage[0].path}/package.json`
    ).toString()
  );
  packageJson.version = version;
  (0, node_fs_1.writeFileSync)(
    `${globalPackage[0].path}/package.json`,
    JSON.stringify(packageJson)
  );
  (0, node_child_process_1.execSync)(
    `pnpm s-prettier ${globalPackage[0].path}/package.json`
  );
  subPackages.forEach((subPackage) => {
    const packageJson = JSON.parse(
      (0, node_fs_1.readFileSync)(`${subPackage.path}/package.json`).toString()
    );
    packageJson.version = version;
    (0, node_fs_1.writeFileSync)(
      `${subPackage.path}/package.json`,
      JSON.stringify(packageJson)
    );
    (0, node_child_process_1.execSync)(
      `pnpm s-prettier ${subPackage.path}/package.json`
    );
  });
};
const getNewVersion = (version, type) => {
  const versions = version.split(".");
  switch (type) {
    case "major":
      return `${Number(versions[0]) + 1}.0.0`;
    case "minor":
      return `${versions[0]}.${Number(versions[1]) + 1}.0`;
    case "patch":
      return `${versions[0]}.${versions[1]}.${Number(versions[2]) + 1}`;
  }
};
inquirer_1.default
  .prompt([
    {
      name: "您想要更新版本号的阶段是?",
      type: "list",
      choices: ["major(主版本号)", "minor(次版本号)", "patch(修订号)"],
    },
  ])
  .then((answers) => {
    const newVersion = getNewVersion(
      globalPackage[0].version,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      answers["您想要更新版本号的阶段是?"].split("(")[0]
    );
    console.log(`新版本号: ${newVersion}`);
    changeAllPackagesVersion(newVersion);
  })
  .catch((error) => {
    console.error(error);
  });
