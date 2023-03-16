import { Module } from "@nestjs/common";
import { ConfigModule as _ConfigModule } from "@nestjs/config";
import authorizationConfig from "./authorization.config";
import databaseConfig from "./database.config";
import mailerConfig from "./mailer.config";
import redisConfig from "./redis.config";
import serviceConfig from "./service.config";

@Module({
  imports: [
    _ConfigModule.forRoot({
      load: [
        databaseConfig,
        authorizationConfig,
        mailerConfig,
        redisConfig,
        serviceConfig,
      ],
      isGlobal: true,
      cache: true,
    }),
  ],
})
export default class ConfigModule {}

export * from "@nestjs/config";
export { default as authorizationConfig } from "./authorization.config";
export * from "./configuration.yaml";
export { default as databaseConfig } from "./database.config";
export { default as mailerConfig } from "./mailer.config";
export { default as redisConfig } from "./redis.config";
export { default as serviceConfig } from "./service.config";
