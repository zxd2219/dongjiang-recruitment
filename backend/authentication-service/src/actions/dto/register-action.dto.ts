import {
  Advertiser,
  Applicant,
  Personnel,
} from "@dongjiang-recruitment/nest-common/dist/http";

export class RegisterActionDto {
  /**
   * 账号类型
   */
  accountType: number;
  /**
   * 密码
   */
  password: string;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 短信验证码
   */
  verificationCode: string;
  /**
   * 详细信息
   */
  detail?: Applicant | Advertiser | Personnel;
}

export enum AccountType {
  /**
   * 管理员
   */
  Manager = 0,
  /**
   * 求职者
   */
  Applicant = 1,
  /**
   * 人事
   */
  Personnel = 2,
  /**
   * 广告商
   */
  Advertiser = 3,
}
