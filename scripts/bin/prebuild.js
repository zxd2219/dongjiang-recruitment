"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
// 列出 monorepo 中所有的包
const allPackages = JSON.parse(
  (0, node_child_process_1.execSync)(
    `pnpm m ls --json --depth=-1 --filter "@dongjiang-recruitment/**"`
  ).toString() || "[]"
);
// 获取当前包的 dependencies 和 devDependencies
const { dependencies, devDependencies } = JSON.parse(
  (0, node_fs_1.readFileSync)(
    (0, node_path_1.resolve)(process.cwd(), "package.json")
  ).toString()
);
// 获取当前包的 dependencies 和 devDependencies 中所有在 monorepo 中的包
const dependencyPackages = Object.keys({ ...dependencies, ...devDependencies })
  .filter((dependency) => allPackages.find((pkg) => pkg.name === dependency))
  .map((dependency) => ({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...allPackages.find((pkg) => pkg.name === dependency),
  }))
  .filter((dependency) =>
    dependency.path
      .replace((0, node_path_1.resolve)(__dirname, "../../"), "")
      .startsWith("/packages/")
  )
  .filter(
    (dependency) =>
      JSON.parse(
        (0, node_fs_1.readFileSync)(
          dependency.path + "/package.json",
          "utf-8"
        ).toString()
      ).scripts?.build
  );
// 获取 git 目录
const gitDir = (0, node_child_process_1.execSync)("git rev-parse --git-dir")
  .toString()
  .trim();
const currentHash = (0, node_child_process_1.execSync)("git rev-parse HEAD")
  .toString()
  .trim();
// 如果 prebuild-lock.json 不存在，则创建一个空的
if (
  !(0, node_fs_1.existsSync)(
    (0, node_path_1.resolve)(gitDir, "prebuild-lock.json")
  )
) {
  (0, node_fs_1.writeFileSync)(
    (0, node_path_1.resolve)(gitDir, "prebuild-lock.json"),
    JSON.stringify({}, null, 2)
  );
}
// 获取 prebuild-lock.json 中的内容
const prebuildLock = JSON.parse(
  (0, node_fs_1.readFileSync)(
    (0, node_path_1.resolve)(gitDir, "prebuild-lock.json")
  ).toString()
);
// 列出所有需要重新构建的依赖
const needRebuildDependencies = dependencyPackages.length
  ? JSON.parse(
      (0, node_child_process_1.execSync)(
        `pnpm m ls --json --depth=-1 --filter "${dependencyPackages
          .map((pkg) =>
            prebuildLock[pkg.name]
              ? `${pkg.name}[${prebuildLock[pkg.name]}]`
              : pkg.name
          )
          .join(`" --filter "`)}"`
      ).toString() || "[]"
    )
  : [];
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
  (0, node_child_process_1.execSync)(
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
  (0, node_fs_1.writeFileSync)(
    (0, node_path_1.resolve)(gitDir, "prebuild-lock.json"),
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
