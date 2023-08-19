import concurrently from "concurrently";
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { relative } from "node:path";
import { exit } from "node:process";

interface Package {
  name: string;
  version: string;
  path: string;
  private: boolean;
}

type Linters = "eslint" | "stylelint" | "vue-tsc";
type LinterConfig = {
  lintName: Linters;
  lintCommand: string;
  configFiles: string[];
  prefixColor: string;
};

const linterConfigs: Array<LinterConfig> = [
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

const branch = execSync("echo -n $(git symbolic-ref --short -q HEAD)");
let filter = process.argv[2];
try {
  execSync("git log");
  filter ||= `@dongjiang-recruitment/**[${branch.toString()}]`;
} catch (error) {
  filter ||= `@dongjiang-recruitment/**`;
}

const packages = (
  JSON.parse(
    execSync(`pnpm m ls --json --depth=-1 --filter "${filter}"`).toString() ||
      "[]"
  ) as Array<Package>
).map(({ path }) => relative(process.cwd(), path));

packages.length &&
  concurrently(
    packages.map((path) => {
      const activeLinters = linterConfigs.filter(({ configFiles }) =>
        configFiles.some((configFile) => existsSync(`${path}/${configFile}`))
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
        cwd: relative(process.cwd(), path),
        name: `lint-fix ${path}`,
        prefixColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      };
    }),
    {
      group: true,
      cwd: process.cwd(),
      maxProcesses: 5,
    }
  ).result.catch(() => exit(1));
