/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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
  deletedAt: string;
  /**
   * 求职者ID
   */
  applicantId: string;
  /**
   * {1:待查看,2:已查看,3:通过筛选,4:约面试,5:不合适}
   */
  status: DeliveryRecord.status;
  /**
   * 面试时间
   */
  interviewTime: string;
  /**
   * 公司ID
   */
  companyId: string;
  /**
   * 职位ID
   */
  positionId: string;
};

export namespace DeliveryRecord {
  /**
   * {1:待查看,2:已查看,3:通过筛选,4:约面试,5:不合适}
   */
  export enum status {
    UnViewed = 1,
    Viewed = 2,
    PassFilter = 3,
    Interview = 4,
    Inappropriate = 5,
  }
}
