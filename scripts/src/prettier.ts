import { execSync } from "node:child_process";
import {
appendFileSync,
existsSync,
readFileSync,
unlinkSync,
writeFileSync
} from "node:fs";
import { join } from "node:path";

const randomChars = () => {
  return Math.random().toString(36).slice(2);
};

const globalIgnorePath = join(__dirname, "../../.gitignore");
const globalIgnoreContent = readFileSync(globalIgnorePath, "utf-8");
const tempIgnorePath = join(process.cwd(), `.${randomChars()}.gitignore`);
writeFileSync(tempIgnorePath, globalIgnoreContent);
const currentIgnorePath = join(process.cwd(), ".gitignore");
if (existsSync(currentIgnorePath)) {
  const currentIgnoreContent = readFileSync(currentIgnorePath, "utf-8");
  appendFileSync(tempIgnorePath, currentIgnoreContent);
}

const globalConfigPath = join(__dirname, "../../.prettierrc");
const globalConfigContent = readFileSync(globalConfigPath, "utf-8");
const tempConfigPath = join(process.cwd(), `.prettierrc.${randomChars()}.json`);
writeFileSync(tempConfigPath, globalConfigContent);
const currentConfigPath = join(process.cwd(), ".prettierrc");
if (existsSync(currentConfigPath)) {
  const currentConfigContent = readFileSync(currentConfigPath, "utf-8");
  writeFileSync(
    tempConfigPath,
    JSON.stringify({
      ...JSON.parse(globalConfigContent),
      ...JSON.parse(currentConfigContent),
    })
  );
}

try {
  execSync(
    `prettier --write --config ${tempConfigPath} --ignore-path ${tempIgnorePath} ${process.argv
      .slice(2)
      .map((arg) => arg.replace(/\$/g, "\\$"))
      .join(" ")}`
  );
  unlinkSync(tempIgnorePath);
  unlinkSync(tempConfigPath);
} catch (error) {
  unlinkSync(tempIgnorePath);
  unlinkSync(tempConfigPath);
  process.exit(1);
}
