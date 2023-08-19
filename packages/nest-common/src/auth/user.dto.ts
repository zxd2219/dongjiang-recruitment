import { RequestMethod } from "@nestjs/common";

export interface User {
  id: string;
  authorities?: Array<[string, RequestMethod]>;
  detailId: DetailId;
}

/**
 * 详情ID
 */
export class DetailId {
  /**
   * 广告商
   */
  advertiser?: string;
  /**
   * 求职者
   */
  applicant?: string;
  /**
   * 管理员
   */
  manager?: string;
  /**
   * 人事
   */
  personnel?: string;
}
