/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 求职期望
 */
export type JobExpectation = {
  /**
   * 求职期望ID
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
   * {1:全职,2:兼职,3:实习}
   */
  positionType: JobExpectation.positionType;
  /**
   * 细分标签
   */
  directionTags: Array<string>;
  /**
   * 职位名称
   */
  positionName: string;
  /**
   * 单位K
   */
  startingSalary: number;
  /**
   * 单位K
   */
  ceilingSalary: number;
  /**
   * 期望城市
   */
  cityName: string;
};

export namespace JobExpectation {
  /**
   * {1:全职,2:兼职,3:实习}
   */
  export enum positionType {
    FullTime = 1,
    PartTime = 2,
    Practice = 3,
  }
}
