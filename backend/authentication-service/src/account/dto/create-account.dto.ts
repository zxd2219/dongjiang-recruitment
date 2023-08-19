import {
  Advertiser,
  Applicant,
  Personnel,
} from "@dongjiang-recruitment/nest-common/dist/http";
import { AuthorityGroup } from "src/authority-group/entities/authority-group.entity";
import { Authority } from "src/authority/entities/authority.entity";

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

export class CreateAccountDto {
  /**
   * 账号类型
   */
  accountType: number;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 详细信息
   */
  detail?: Applicant | Advertiser | Personnel;
  /**
   * 权限组列表
   */
  authorityGroups?: AuthorityGroup[];
  /**
   * 权限列表
   */
  authorities?: Authority[];
}
