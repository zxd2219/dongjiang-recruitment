"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const concurrently_1 = __importDefault(require("concurrently"));
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const node_process_1 = require("node:process");
const linterConfigs = [
  // {
  //   lintName: "eslint",
  //   lintCommand: "eslint **/*.{js,jsx,ts,tsx,vue} --fix",
  //   configFiles: [".eslintrc"],
  //   prefixColor: "bgYellow",
  // },
  {
    lintName: "stylelint",
    lintCommand: "stylelint **/*.{css,scss,sass,less,styl,vue} --fix",
    configFiles: [".stylelintrc"],
    prefixColor: "bgGreen",
  },
  {
    lintName: "vue-tsc",
    lintCommand: "vue-tsc --noEmit",
    configFiles: ["tsconfig.json"],
    prefixColor: "bgBlue",
  },
];
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
  (0, concurrently_1.default)(
    packages.map((path) => {
      const activeLinters = linterConfigs.filter(({ configFiles }) =>
        configFiles.some((configFile) =>
          (0, node_fs_1.existsSync)(`${path}/${configFile}`)
        )
      );
      const langs = activeLinters.map(({ lintName: language }) => language);
      const commands = activeLinters.map(({ lintCommand }) => lintCommand);
      const prefixColors = activeLinters.map(({ prefixColor }) => prefixColor);
      return {
        command: activeLinters.length
          ? `s-prebuild && concurrently --prefix-colors "${prefixColors.join(
              ","
            )}" ` +
            `--names "${langs.map((lang) => `lint-fix ${lang}`).join(",")}" ` +
            `"${commands.join('" "')}" `
          : `node -e "console.log('\x1b[33m%s\x1b[0m', 'Warning: No linter config found in ${path}')"`,
        cwd: (0, node_path_1.relative)(process.cwd(), path),
        name: `lint-fix ${path}`,
        prefixColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      };
    }),
    {
      group: true,
      cwd: process.cwd(),
      maxProcesses: 5,
    }
  ).result.catch(() => (0, node_process_1.exit)(1));
