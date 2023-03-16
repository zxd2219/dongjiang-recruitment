"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const randomChars = () => {
  return Math.random().toString(36).slice(2);
};
const globalIgnorePath = (0, node_path_1.join)(__dirname, "../../.gitignore");
const globalIgnoreContent = (0, node_fs_1.readFileSync)(
  globalIgnorePath,
  "utf-8"
);
const tempIgnorePath = (0, node_path_1.join)(
  process.cwd(),
  `.${randomChars()}.gitignore`
);
(0, node_fs_1.writeFileSync)(tempIgnorePath, globalIgnoreContent);
const currentIgnorePath = (0, node_path_1.join)(process.cwd(), ".gitignore");
if ((0, node_fs_1.existsSync)(currentIgnorePath)) {
  const currentIgnoreContent = (0, node_fs_1.readFileSync)(
    currentIgnorePath,
    "utf-8"
  );
  (0, node_fs_1.appendFileSync)(tempIgnorePath, currentIgnoreContent);
}
const globalConfigPath = (0, node_path_1.join)(__dirname, "../../.prettierrc");
const globalConfigContent = (0, node_fs_1.readFileSync)(
  globalConfigPath,
  "utf-8"
);
const tempConfigPath = (0, node_path_1.join)(
  process.cwd(),
  `.prettierrc.${randomChars()}.json`
);
(0, node_fs_1.writeFileSync)(tempConfigPath, globalConfigContent);
const currentConfigPath = (0, node_path_1.join)(process.cwd(), ".prettierrc");
if ((0, node_fs_1.existsSync)(currentConfigPath)) {
  const currentConfigContent = (0, node_fs_1.readFileSync)(
    currentConfigPath,
    "utf-8"
  );
  (0, node_fs_1.writeFileSync)(
    tempConfigPath,
    JSON.stringify({
      ...JSON.parse(globalConfigContent),
      ...JSON.parse(currentConfigContent),
    })
  );
}
try {
  (0, node_child_process_1.execSync)(
    `prettier --write --config ${tempConfigPath} --ignore-path ${tempIgnorePath} ${process.argv
      .slice(2)
      .map((arg) => arg.replace(/\$/g, "\\$"))
      .join(" ")}`
  );
  (0, node_fs_1.unlinkSync)(tempIgnorePath);
  (0, node_fs_1.unlinkSync)(tempConfigPath);
} catch (error) {
  (0, node_fs_1.unlinkSync)(tempIgnorePath);
  (0, node_fs_1.unlinkSync)(tempConfigPath);
  process.exit(1);
}
