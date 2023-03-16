import { RedisModule as _RedisModule } from "@liaoliaots/nestjs-redis";
import { Module } from "@nestjs/common";
import { ConfigType, redisConfig as _redisConfig } from "../config";

@Module({
  imports: [
    _RedisModule.forRootAsync({
      inject: [_redisConfig.KEY],
      useFactory(redisConfig: ConfigType<typeof _redisConfig>) {
        return {
          config: {
            host: redisConfig.host,
            port: redisConfig.port,
            db: redisConfig.database,
            password: redisConfig.password,
          },
        };
      },
    }),
  ],
})
export default class RedisModule {}

export * from "@liaoliaots/nestjs-redis";
export * from "ioredis";
