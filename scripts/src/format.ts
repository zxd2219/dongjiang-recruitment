import concurrently from "concurrently";
import { execSync } from "node:child_process";
import { relative } from "node:path";
import { exit } from "node:process";

interface Package {
  name: string;
  version: string;
  path: string;
  private: boolean;
}

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
    packages.map((path) => ({
      command: `prettier --write --ignore-path .gitignore --config .prettierrc ${path}`,
      name: `format ${path}`,
      prefixColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    })),
    {
      group: true,
      cwd: process.cwd(),
      maxProcesses: 5,
    }
  ).result.catch(() => exit(1));
