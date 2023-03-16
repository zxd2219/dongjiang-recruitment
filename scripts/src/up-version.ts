import inquirer from "inquirer";
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import type { PackageJson } from "type-fest";

interface Package {
  name: string;
  version: string;
  path: string;
  private: boolean;
}

const globalPackage = JSON.parse(
  execSync(
    `pnpm m ls --json --depth=-1 --filter "dongjiang-recruitment"`
  ).toString() || "[]"
) as Array<Package>;

const subPackages = JSON.parse(
  execSync(
    `pnpm m ls --json --depth=-1 --filter "@dongjiang-recruitment/**"`
  ).toString() || "[]"
) as Array<Package>;

console.log(`当前版本号: ${globalPackage[0].version}`);

const changeAllPackagesVersion = (version: string) => {
  const packageJson = JSON.parse(
    readFileSync(`${globalPackage[0].path}/package.json`).toString()
  ) as PackageJson;
  packageJson.version = version;
  writeFileSync(
    `${globalPackage[0].path}/package.json`,
    JSON.stringify(packageJson)
  );
  execSync(`pnpm s-prettier ${globalPackage[0].path}/package.json`);
  subPackages.forEach((subPackage) => {
    const packageJson = JSON.parse(
      readFileSync(`${subPackage.path}/package.json`).toString()
    ) as PackageJson;
    packageJson.version = version;
    writeFileSync(
      `${subPackage.path}/package.json`,
      JSON.stringify(packageJson)
    );
    execSync(`pnpm s-prettier ${subPackage.path}/package.json`);
  });
};

const getNewVersion = (version: string, type: "major" | "minor" | "patch") => {
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

inquirer
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
      (answers["您想要更新版本号的阶段是?"] as string).split("(")[0] as
        | "major"
        | "minor"
        | "patch"
    );
    console.log(`新版本号: ${newVersion}`);
    changeAllPackagesVersion(newVersion);
  })
  .catch((error) => {
    console.error(error);
  });
