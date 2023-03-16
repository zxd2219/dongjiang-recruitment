"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const concurrently_1 = __importDefault(require("concurrently"));
const node_child_process_1 = require("node:child_process");
const node_path_1 = require("node:path");
const node_process_1 = require("node:process");
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
const lintStagedConfigPath = `${process.cwd()}/.lintstagedrc`;
packages.length &&
  (0, concurrently_1.default)(
    packages.map((path) => ({
      command: `s-prebuild && lint-staged --config ${lintStagedConfigPath}`,
      cwd: (0, node_path_1.relative)(process.cwd(), path),
      name: `lint-staged ${path}`,
      prefixColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    })),
    {
      group: true,
      cwd: process.cwd(),
      maxProcesses: 1,
    }
  ).result.catch(() => (0, node_process_1.exit)(1));
