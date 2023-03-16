import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { TransformExceptionFilter } from "./transform-exception.filter";
import { TransformNormalInterceptor } from "./transform-normal.interceptor";

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: TransformExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformNormalInterceptor,
    },
  ],
})
export default class TransformModule {}

export * from "class-transformer";
