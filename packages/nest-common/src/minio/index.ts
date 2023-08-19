import { Global, Module } from "@nestjs/common";
import { MinioModule as _MinioModule } from "nestjs-minio-client";
import { ConfigType, minioConfig as _minioConfig } from "../config";

@Global()
@Module({
  imports: [
    _MinioModule.registerAsync({
      inject: [_minioConfig.KEY],
      useFactory: async (minioConfig: ConfigType<typeof _minioConfig>) => ({
        endPoint: minioConfig.endPoint,
        port: minioConfig.port,
        useSSL: minioConfig.useSSL,
        accessKey: minioConfig.accessKey,
        secretKey: minioConfig.secretKey,
      }),
    }),
  ],
  exports: [
    _MinioModule.registerAsync({
      inject: [_minioConfig.KEY],
      useFactory: async (minioConfig: ConfigType<typeof _minioConfig>) => ({
        endPoint: minioConfig.endPoint,
        port: minioConfig.port,
        useSSL: minioConfig.useSSL,
        accessKey: minioConfig.accessKey,
        secretKey: minioConfig.secretKey,
      }),
    }),
  ],
})
export default class MinioModule {}

export * from "nestjs-minio-client";
