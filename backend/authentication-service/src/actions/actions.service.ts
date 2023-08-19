import { JwtService } from "@dongjiang-recruitment/nest-common/dist/auth";
import {
  Redis,
  RedisService,
} from "@dongjiang-recruitment/nest-common/dist/redis";
import { BadRequestException, Injectable } from "@nestjs/common";
import { AccountService } from "src/account/account.service";
import { BcryptService } from "src/bcrypt.module";
import * as zlib from "zlib";
import { ChangePasswordActionDto } from "./dto/change-password-action.dto";
import { ForgetPasswordActionDto } from "./dto/forget-password-action.dto";
import { LoginActionDto } from "./dto/login-action.dto";
import { RegisterActionDto } from "./dto/register-action.dto";

@Injectable()
export class ActionsService {
  private readonly redis: Redis;

  constructor(
    private readonly accountService: AccountService,
    private readonly redisService: RedisService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {
    this.redis = this.redisService.getClient();
  }

  async register(createAccountDto: RegisterActionDto) {
    const { userName, verificationCode } = createAccountDto;

    // 检查验证码是否正确
    const trueVerificationCode = await this.redis.get(
      `verification-code:${userName}`
    );
    if (trueVerificationCode !== verificationCode) {
      throw new BadRequestException("验证码错误");
    }

    return await this.accountService.create(createAccountDto);
  }

  async destroy(id: string, verificationCode: string) {
    // 检查账号是否存在
    const account = await this.accountService.findOne(id);
    if (!account) throw new BadRequestException("账号不存在");

    // 检查验证码是否正确
    const trueVerificationCode = await this.redis.get(
      `verification-code:${account.userName}`
    );
    if (trueVerificationCode !== verificationCode) {
      throw new BadRequestException("验证码错误");
    }

    return await this.accountService.remove(id);
  }

  async login(loginActionDto: LoginActionDto) {
    const { password, userName } = loginActionDto;

    // 检查账号是否存在
    const { items: accounts } = await this.accountService.findAll(
      [
        {
          userName,
        },
      ],
      { page: 0, size: 1, sort: {} }
    );
    if (!accounts[0]) throw new BadRequestException("账号不存在");

    // 检查密码是否正确
    if (!(await this.bcryptService.compare(password, accounts[0].password))) {
      throw new BadRequestException("密码错误");
    }

    const authoritiesFilterMap = new Map();
    return {
      token: this.jwtService.sign({
        id: accounts[0].id,
        did: accounts[0].detailId,
        auth: zlib
          .gzipSync(
            JSON.stringify(
              accounts[0].authorities
                .concat(
                  accounts[0].authorityGroups
                    .map((group) => group.authorities)
                    .flat()
                )
                .filter((authority) => {
                  if (authoritiesFilterMap.has(authority.id)) {
                    return false;
                  } else {
                    authoritiesFilterMap.set(authority.id, true);
                    return true;
                  }
                })
            )
          )
          .toString("base64"),
      }),
      account: accounts[0],
    };
  }

  async changePassword(
    id: string,
    changePasswordActionDto: ChangePasswordActionDto
  ) {
    const account = await this.accountService.findOne(id);
    if (!account) throw new BadRequestException("账号不存在");

    const { password, verificationCode } = changePasswordActionDto;

    // 检查验证码是否正确
    const trueVerificationCode = await this.redis.get(
      `verification-code:${account.userName}`
    );
    if (trueVerificationCode !== verificationCode) {
      throw new BadRequestException("验证码错误");
    }

    return await this.accountService.update(id, { ...account, password });
  }

  async forgetPassword(forgetPasswordActionDto: ForgetPasswordActionDto) {
    const { password, userName, verificationCode } = forgetPasswordActionDto;

    // 检查验证码是否正确
    const trueVerificationCode = await this.redis.get(
      `verification-code:${userName}`
    );
    if (trueVerificationCode !== verificationCode) {
      throw new BadRequestException("验证码错误");
    }

    // 检查账号是否存在
    const { items: accounts } = await this.accountService.findAll(
      [
        {
          userName,
        },
      ],
      { page: 0, size: 1, sort: {} }
    );
    if (!accounts[0]) throw new BadRequestException("账号不存在");

    return await this.accountService.update(accounts[0].id, {
      ...accounts[0],
      password,
    });
  }
}
