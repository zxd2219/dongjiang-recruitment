/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Applicant } from "./Applicant";
import type { Company } from "./Company";

/**
 * 关注记录
 */
export type AttentionRecord = {
  /**
   * 关注记录ID
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
   * 公司
   */
  company: Company;
};
