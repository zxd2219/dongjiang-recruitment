/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Applicant } from "./Applicant";
import type { Personnel } from "./Personnel";

/**
 * 人事查看记录
 */
export type PersonnelInspectionRecord = {
  /**
   * 人事查看记录ID
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
   * 人事
   */
  personnel: Personnel;
  /**
   * 求职者
   */
  applicant: Applicant;
};
