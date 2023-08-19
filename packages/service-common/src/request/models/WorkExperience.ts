/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 工作经历
 */
export type WorkExperience = {
  /**
   * 工作经历ID
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
   * 公司名称
   */
  companyName: string;
  /**
   * 公司领域
   */
  companyIndustry: string;
  /**
   * 就职时间
   */
  startTime: string;
  /**
   * 离职时间
   */
  endTime: string;
  /**
   * 职位类型，eg；{1:FullTime,2:PartTime,3:Practice}
   */
  positionType: WorkExperience.positionType;
  /**
   * 职位名称
   */
  positionName: string;
  /**
   * 部门名称
   */
  departmentName: string;
  /**
   * 工作内容
   */
  jobContent: string;
};

export namespace WorkExperience {
  /**
   * 职位类型，eg；{1:FullTime,2:PartTime,3:Practice}
   */
  export enum positionType {
    FullTime = 1,
    PartTime = 2,
    Practice = 3,
  }
}
