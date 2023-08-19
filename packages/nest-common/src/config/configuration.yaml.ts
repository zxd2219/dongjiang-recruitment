import { resolve } from "node:path";

export const YAML_CONFIG_FILENAME =
  process.env.NODE_ENV === "production"
    ? "/etc/dongjiang-recruitment/config.yaml"
    : resolve(__dirname, "../../", "config.local.yaml");

export interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface AuthorizationConfig {
  secret: string;
  expiresIn: string;
}

export interface MailerConfig {
  host: string;
  port: number;
  secure: boolean;
  domain: string;
  auth: {
    user: string;
    pass: string;
  };
}

export interface RedisConfig {
  host: string;
  port: number;
  database: number;
  password: string;
}

export interface ServiceConfig {
  baseUrl: string;
  username: string;
  password: string;
}

export interface MinioConfig {
  username: string;
  password: string;
  endPoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
  bucket: string;
}

export interface AlipayConfig {
  appId: string;
  gateway: string;
  privateKey: string;
  alipayPublicKey: string;
}

export interface YamlConfiguration {
  database: DatabaseConfig;
  authorization: AuthorizationConfig;
  mailer: MailerConfig;
  redis: RedisConfig;
  service: ServiceConfig;
  minio: MinioConfig;
  alipay: AlipayConfig;
}
