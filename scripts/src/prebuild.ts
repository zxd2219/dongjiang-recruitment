import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { PackageJson } from "type-fest";

interface Package {
  name: string;
  version: string;
  path: string;
  private: boolean;
}

// 列出 monorepo 中所有的包
const allPackages = JSON.parse(
  execSync(
    `pnpm m ls --json --depth=-1 --filter "@dongjiang-recruitment/**"`
  ).toString() || "[]"
) as Array<Package>;

// 获取当前包的 dependencies 和 devDependencies
const { dependencies, devDependencies } = JSON.parse(
  readFileSync(resolve(process.cwd(), "package.json")).toString()
) as PackageJson;

// 获取当前包的 dependencies 和 devDependencies 中所有在 monorepo 中的包
const dependencyPackages = Object.keys({ ...dependencies, ...devDependencies })
  .filter((dependency) => allPackages.find((pkg) => pkg.name === dependency))
  .map((dependency) => ({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...allPackages.find((pkg) => pkg.name === dependency)!,
  }))
  .filter((dependency) =>
    dependency.path
      .replace(resolve(__dirname, "../../"), "")
      .startsWith("/packages/")
  )
  .filter(
    (dependency) =>
      (
        JSON.parse(
          readFileSync(dependency.path + "/package.json", "utf-8").toString()
        ) as PackageJson
      ).scripts?.build
  );

// 获取 git 目录
const gitDir = execSync("git rev-parse --git-dir").toString().trim();
const currentHash = execSync("git rev-parse HEAD").toString().trim();

// 如果 prebuild-lock.json 不存在，则创建一个空的
if (!existsSync(resolve(gitDir, "prebuild-lock.json"))) {
  writeFileSync(
    resolve(gitDir, "prebuild-lock.json"),
    JSON.stringify({}, null, 2)
  );
}

// 获取 prebuild-lock.json 中的内容
const prebuildLock = JSON.parse(
  readFileSync(resolve(gitDir, "prebuild-lock.json")).toString()
) as Record<string, string>;

// 列出所有需要重新构建的依赖
const needRebuildDependencies = (
  dependencyPackages.length
    ? JSON.parse(
        execSync(
          `pnpm m ls --json --depth=-1 --filter "${dependencyPackages
            .map((pkg) =>
              prebuildLock[pkg.name]
                ? `${pkg.name}[${prebuildLock[pkg.name]}]`
                : pkg.name
            )
            .join(`" --filter "`)}"`
        ).toString() || "[]"
      )
    : []
) as Array<Package>;

// 如果有需要重新构建的依赖，则执行构建
if (needRebuildDependencies.length) {
  // 输出提示
  console.log(
    "\x1b[34m%s\x1b[0m\x1b[32m%s\x1b[0m",
    "[scripts prebuild] ",
    `Building dependencies: ${needRebuildDependencies
      .map((pkg) => pkg.name)
      .join(", ")}`
  );

  execSync(
    `pnpm --filter ${needRebuildDependencies
      .map((pkg) => pkg.name)
      .join(" --filter ")} build`,
    {
      stdio: "inherit",
    }
  );

  // 更新 prebuild-lock.json
  needRebuildDependencies.forEach((pkg) => {
    prebuildLock[pkg.name] = currentHash;
  });

  // 写入 prebuild-lock.json
  writeFileSync(
    resolve(gitDir, "prebuild-lock.json"),
    JSON.stringify(prebuildLock, null, 2)
  );
} else {
  // 如果没有需要重新构建的依赖，则输出提示
  console.log(
    "\x1b[34m%s\x1b[0m\x1b[32m%s\x1b[0m",
    "[scripts prebuild] ",
    "No dependencies need to be rebuild."
  );
}
