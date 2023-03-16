/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 求职者
 */
export type Applicant = {
  /**
   * 求职者ID
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
   * 头像地址
   */
  avatarUrl: string;
  /**
   * 姓
   */
  firstName: string;
  /**
   * 名
   */
  lastName: string;
  /**
   * 生日
   */
  dateOfBirth: string;
  /**
   * 性别
   */
  sex: string;
  /**
   * 年龄
   */
  age: number;
  /**
   * 所在城市
   */
  cityName: string;
  /**
   * 电子邮箱
   */
  email: string;
  /**
   * {1:没有工作经验,2:在校/应届,3:3年一下,4:3-5年,5:5-10年,6:10年以上}
   */
  workingYears: Applicant.workingYears;
  /**
   * {0:未知,1:大专,2:本科,3:硕士,4:博士}
   */
  education: Applicant.education;
  /**
   * 个人优势
   */
  personalAdvantage: string;
  /**
   * 社交主页
   */
  socialHomepage: string;
  /**
   * {1:随时入职,2:2周内入职,3:1月内入职}
   */
  jobStatus: Applicant.jobStatus;
  /**
   * 图片作品
   */
  pictureWorks: Array<string>;
  /**
   * {1:实名,2:匿名}
   */
  privacySettings: Applicant.privacySettings;
};

export namespace Applicant {
  /**
   * {1:没有工作经验,2:在校/应届,3:3年一下,4:3-5年,5:5-10年,6:10年以上}
   */
  export enum workingYears {
    NoExperience = 1,
    InSchoolOrFreshGraduate = 2,
    Under3Year = 3,
    With3To5Year = 4,
    With5To10Year = 5,
    MoreThen10Year = 6,
  }

  /**
   * {0:未知,1:大专,2:本科,3:硕士,4:博士}
   */
  export enum education {
    Unknown = 0,
    JuniorCollege = 1,
    Undergraduate = 2,
    Postgraduate = 3,
    Doctor = 4,
  }

  /**
   * {1:随时入职,2:2周内入职,3:1月内入职}
   */
  export enum jobStatus {
    Unknown = 0,
    AnyTime = 1,
    TwoWeeks = 2,
    OneMoth = 3,
  }

  /**
   * {1:实名,2:匿名}
   */
  export enum privacySettings {
    RealName = 1,
    Anonymous = 2,
  }
}
