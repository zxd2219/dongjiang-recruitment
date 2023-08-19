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
  deletedAt: string | null;
  /**
   * 学校名称
   */
  schoolName: string;
  /**
   * 学历层次，eg；{1:JuniorCollege,2:Undergraduate,3:Postgraduate,4:Doctor}
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
   * 学历层次，eg；{1:JuniorCollege,2:Undergraduate,3:Postgraduate,4:Doctor}
   */
  export enum education {
    JuniorCollege = 1,
    Undergraduate = 2,
    Postgraduate = 3,
    Doctor = 4,
  }
}
