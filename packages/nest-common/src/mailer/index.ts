import { MailerModule as _MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { join } from "node:path";

import { ConfigType, mailerConfig as _mailerConfig } from "../config";

@Module({
  imports: [
    _MailerModule.forRootAsync({
      inject: [_mailerConfig.KEY],
      useFactory(mailerConfig: ConfigType<typeof _mailerConfig>) {
        return {
          transport: {
            host: mailerConfig.host,
            port: mailerConfig.port,
            secure: mailerConfig.secure,
            auth: {
              user: mailerConfig.auth.user,
              pass: mailerConfig.auth.pass,
            },
          },
          defaults: {
            from: `No Reply <${mailerConfig.auth.user}>`,
          },
          template: {
            dir: join(__dirname, "templates"),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
})
export default class MailerModule {}

export * from "@nestjs-modules/mailer";
