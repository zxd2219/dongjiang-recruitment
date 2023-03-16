/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 筛选条件
 */
export type FilterCriteria = {
  /**
   * 细分方向
   */
  occupationalBreakdown: Array<string>;
  /**
   * 期望薪资
   */
  expectedSalary: Array<string>;
  /**
   * 工作经历
   */
  workExperience: Array<string>;
  /**
   * 学历
   */
  education: Array<string>;
  /**
   * 工作性质
   */
  natureWork: Array<string>;
  /**
   * 公司规模
   */
  companySize: Array<string>;
  /**
   * 融资阶段
   */
  financingStage: Array<string>;
  /**
   * 行业领域
   */
  industryField: Array<string>;
};
