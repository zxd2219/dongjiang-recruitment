/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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
  deletedAt: string;
  /**
   * 人事ID
   */
  personnelId: string;
  /**
   * 求职者ID
   */
  applicantId: string;
};
