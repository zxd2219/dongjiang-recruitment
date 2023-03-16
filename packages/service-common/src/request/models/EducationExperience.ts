/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 教育经历
 */
export type EducationExperience = {
  /**
   * 教育经历ID
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
   * 学校名称
   */
  schoolName: string;
  /**
   * {1:大专,2:本科,3:硕士,4:博士}
   */
  education: EducationExperience.education;
  /**
   * 专业名称
   */
  majorName: string;
  /**
   * 入学时间
   */
  admissionTime: string;
  /**
   * 毕业时间
   */
  graduationTime: string;
};

export namespace EducationExperience {
  /**
   * {1:大专,2:本科,3:硕士,4:博士}
   */
  export enum education {
    JuniorCollege = 1,
    Undergraduate = 2,
    Postgraduate = 3,
    Doctor = 4,
  }
}
