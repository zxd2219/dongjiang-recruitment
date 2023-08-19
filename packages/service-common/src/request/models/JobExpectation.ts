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
  deletedAt: string | null;
  /**
   * 职位类型，eg；{1:FullTime,2:PartTime,3:Practice}
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
   * 职位类型，eg；{1:FullTime,2:PartTime,3:Practice}
   */
  export enum positionType {
    FullTime = 1,
    PartTime = 2,
    Practice = 3,
  }
}
