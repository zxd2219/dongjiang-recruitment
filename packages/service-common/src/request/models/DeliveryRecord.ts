/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Applicant } from "./Applicant";
import type { Company } from "./Company";
import type { Position } from "./Position";

/**
 * 投递记录
 */
export type DeliveryRecord = {
  /**
   * 投递记录ID
   */
  id: string;
  /**
   * 创建时间
   */
  createdAt: string;
  /**
   * 更新时间
   */
  updatedAt: string;
  /**
   * 移除时间
   */
  deletedAt: string | null;
  /**
   * 求职者
   */
  applicant: Applicant;
  /**
   * 投递状态，eg；{1:UnViewed,2:Viewed,3:PassFilter,4:Interview,5:Inappropriate}
   */
  status: DeliveryRecord.status;
  /**
   * 面试时间
   */
  interviewTime: string;
  /**
   * 公司
   */
  company: Company;
  /**
   * 职位
   */
  position: Position;
};

export namespace DeliveryRecord {
  /**
   * 投递状态，eg；{1:UnViewed,2:Viewed,3:PassFilter,4:Interview,5:Inappropriate}
   */
  export enum status {
    UnViewed = 1,
    Viewed = 2,
    PassFilter = 3,
    Interview = 4,
    Inappropriate = 5,
  }
}
