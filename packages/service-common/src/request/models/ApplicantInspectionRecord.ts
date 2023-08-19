/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Applicant } from "./Applicant";
import type { Company } from "./Company";
import type { Position } from "./Position";

/**
 * 求职者查看记录
 */
export type ApplicantInspectionRecord = {
  /**
   * 求职者查看记录ID
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
  /**
   * 职位
   */
  position: Position;
};
