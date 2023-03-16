"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const randomChars = () => {
  return Math.random().toString(36).slice(2);
};
const resolveFromModule = (moduleName, ...paths) => {
  const modulePath = (0, node_path_1.dirname)(
    require.resolve(`${moduleName}/package.json`)
  );
  return (0, node_path_1.join)(modulePath, ...paths);
};
const resolveFromRoot = (...paths) => {
  return (0, node_path_1.join)(process.cwd(), ...paths);
};
const args = process.argv.slice(2);
const argsProjectIndex = args.findIndex(arg => ['-p', '--project'].includes(arg)); // prettier-ignore
const argsProjectValue = argsProjectIndex !== -1 ? args[argsProjectIndex + 1] : undefined; // prettier-ignore
const files = args.filter((file) => /\.(ts|tsx|vue)$/.test(file));
if (files.length === 0) {
  process.exit(0);
}
const remainingArgsToForward = args
  .slice()
  .filter((arg) => !files.includes(arg));
if (argsProjectIndex !== -1) {
  remainingArgsToForward.splice(argsProjectIndex, 2);
}
// Load existing config
const tsconfigPath = argsProjectValue || resolveFromRoot("tsconfig.json");
const tsconfigContent = (0, node_fs_1.readFileSync)(tsconfigPath).toString();
// Use 'eval' to read the JSON as regular JavaScript syntax so that comments are allowed
// eslint-disable-next-line prefer-const
let tsconfig = {};
eval(`tsconfig = ${tsconfigContent}`);
// Write a temp config file
const tmpTsconfigPath = resolveFromRoot(`tsconfig.${randomChars()}.json`);
const tmpTsconfig = {
  ...tsconfig,
  compilerOptions: {
    ...tsconfig.compilerOptions,
    skipLibCheck: true,
  },
  files,
  include: [],
};
(0, node_fs_1.writeFileSync)(
  tmpTsconfigPath,
  JSON.stringify(tmpTsconfig, null, 2)
);
// Type-check our files
const { status } = (0, node_child_process_1.spawnSync)(
  resolveFromModule(
    "vue-tsc",
    `node_modules/.bin/vue-tsc${process.platform === "win32" ? ".cmd" : ""}`
  ),
  ["-p", tmpTsconfigPath, ...remainingArgsToForward],
  { stdio: "inherit" }
);
// Delete temp config file
(0, node_fs_1.unlinkSync)(tmpTsconfigPath);
process.exit(status ?? 0);
