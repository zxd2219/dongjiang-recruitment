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
  deletedAt: string;
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
   * {1:全职,2:兼职,3:实习}
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
   * {1:全职,2:兼职,3:实习}
   */
  export enum positionType {
    FullTime = 1,
    PartTime = 2,
    Practice = 3,
  }
}
