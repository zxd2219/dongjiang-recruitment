import { Module } from "@nestjs/common";
import {
  TypeOrmModule as _TypeOrmModule,
  TypeOrmModuleOptions,
} from "@nestjs/typeorm";
import { databaseConfig as _databaseConfig, ConfigType } from "../config";

@Module({
  imports: [
    _TypeOrmModule.forRootAsync({
      inject: [_databaseConfig.KEY],
      useFactory(databaseConfig: ConfigType<typeof _databaseConfig>) {
        return {
          synchronize: true,
          autoLoadEntities: true,
          type: databaseConfig.type,
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.username,
          password: databaseConfig.password,
          database: databaseConfig.database,
          logging: true,
        } as TypeOrmModuleOptions;
      },
    }),
  ],
})
export default class TypeOrmModule {}

export * from "@nestjs/typeorm";
export * from "typeorm";
