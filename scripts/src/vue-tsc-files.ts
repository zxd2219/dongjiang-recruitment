import { spawnSync } from "node:child_process";
import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { TsConfigJson } from "type-fest";

const randomChars = () => {
  return Math.random().toString(36).slice(2);
};

const resolveFromModule = (moduleName: string, ...paths: Array<string>) => {
  const modulePath = dirname(require.resolve(`${moduleName}/package.json`));
  return join(modulePath, ...paths);
};

const resolveFromRoot = (...paths: Array<string>) => {
  return join(process.cwd(), ...paths);
};

const args = process.argv.slice(2);
const argsProjectIndex = args.findIndex(arg => ['-p', '--project'].includes(arg)) // prettier-ignore
const argsProjectValue = argsProjectIndex !== -1 ? args[argsProjectIndex + 1] : undefined // prettier-ignore

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
const tsconfigContent = readFileSync(tsconfigPath).toString();
// Use 'eval' to read the JSON as regular JavaScript syntax so that comments are allowed
// eslint-disable-next-line prefer-const
let tsconfig = {} as TsConfigJson;
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
writeFileSync(tmpTsconfigPath, JSON.stringify(tmpTsconfig, null, 2));

// Type-check our files
const { status } = spawnSync(
  resolveFromModule(
    "vue-tsc",
    `node_modules/.bin/vue-tsc${process.platform === "win32" ? ".cmd" : ""}`
  ),
  ["-p", tmpTsconfigPath, ...remainingArgsToForward],
  { stdio: "inherit" }
);

// Delete temp config file
unlinkSync(tmpTsconfigPath);

process.exit(status ?? 0);
