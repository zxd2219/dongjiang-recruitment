import { MailerService } from "@dongjiang-recruitment/nest-common/dist/mailer";
import {
  Redis,
  RedisService,
} from "@dongjiang-recruitment/nest-common/dist/redis";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class CommonService {
  private readonly redis: Redis;

  constructor(
    private readonly mailerService: MailerService,
    private readonly redisService: RedisService
  ) {
    this.redis = this.redisService.getClient();
  }

  async getVerificationCode(email: string) {
    const code = Math.random().toString().slice(-6);
    await this.redis.set(`verification-code:${email}`, code, "EX", 60 * 60);
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: "东江招聘 - 验证码",
        template: "verification-code",
        context: {
          email,
          code,
        },
      });
      return "验证码已发送";
    } catch (error) {
      console.error(
        "🚀 ~ file: common.service.ts:20 ~ CommonService ~ getVerificationCode ~ error:",
        error
      );
      throw new InternalServerErrorException("验证码发送失败");
    }
  }
}
