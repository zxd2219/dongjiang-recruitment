import { registerAs } from "@nestjs/config";
import * as yaml from "js-yaml";
import { readFileSync } from "node:fs";
import {
  AlipayConfig,
  YAML_CONFIG_FILENAME,
  YamlConfiguration,
} from "./configuration.yaml";

export default registerAs<AlipayConfig>("alipay", () => {
  return (
    yaml.load(readFileSync(YAML_CONFIG_FILENAME, "utf8")) as YamlConfiguration
  ).alipay;
});
