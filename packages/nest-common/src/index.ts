import { DynamicModule, Module } from "@nestjs/common";
import AuthModule, { AuthOption } from "./auth";
import ConfigModule from "./config";
import HttpModule from "./http";
import MailerModule from "./mailer";
import MinioModule from "./minio";
import RedisModule from "./redis";
import TransformModule from "./transform";
import TypeOrmModule from "./typeorm";
import ValidationModule from "./validation";

const commonModule = [
  ConfigModule,
  HttpModule,
  MailerModule,
  MinioModule,
  RedisModule,
  TransformModule,
  TypeOrmModule,
  ValidationModule,
];

@Module({
  imports: [...commonModule, AuthModule],
})
export class CommonModule {
  static forRoot(options?: { auth?: AuthOption }): DynamicModule {
    return {
      module: CommonModule,
      imports: [...commonModule, AuthModule.forRoot(options?.auth)],
    };
  }
}
