import { registerAs } from "@nestjs/config";
import * as yaml from "js-yaml";
import { readFileSync } from "node:fs";
import {
  RedisConfig,
  YamlConfiguration,
  YAML_CONFIG_FILENAME,
} from "./configuration.yaml";

export default registerAs<RedisConfig>("redis", () => {
  return (
    yaml.load(readFileSync(YAML_CONFIG_FILENAME, "utf8")) as YamlConfiguration
  ).redis;
});
