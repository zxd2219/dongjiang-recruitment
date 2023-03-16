/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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
  deletedAt: string;
  /**
   * 求职者ID
   */
  applicantId: string;
  /**
   * 公司ID
   */
  companyId: string;
  /**
   * 职位ID
   */
  positionId: string;
};
