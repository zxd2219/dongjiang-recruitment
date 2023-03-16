import { Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "./validation.pipe";

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export default class ValidationModule {}

export * from "class-validator";
export * from "./validation.pipe";
