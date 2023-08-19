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
  deletedAt: string | null;
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
   * 工作年限，eg；{1:NoExperience,2:InSchoolOrFreshGraduate,3:Under3Year,4:With3To5Year,5:With5To10Year,6:MoreThen10Year}
   */
  workingYears: Applicant.workingYears;
  /**
   * 学历状态，eg；{0:Unknown,1:JuniorCollege,2:Undergraduate,3:Postgraduate,4:Doctor}
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
   * 求职状态，eg；{0:Unknown,1:AnyTime,2:TwoWeeks,3:OneMoth}
   */
  jobStatus: Applicant.jobStatus;
  /**
   * 图片作品
   */
  pictureWorks: Array<string>;
  /**
   * 隐私设置，eg；{1:RealName,2:Anonymous}
   */
  privacySettings: Applicant.privacySettings;
};

export namespace Applicant {
  /**
   * 工作年限，eg；{1:NoExperience,2:InSchoolOrFreshGraduate,3:Under3Year,4:With3To5Year,5:With5To10Year,6:MoreThen10Year}
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
   * 学历状态，eg；{0:Unknown,1:JuniorCollege,2:Undergraduate,3:Postgraduate,4:Doctor}
   */
  export enum education {
    Unknown = 0,
    JuniorCollege = 1,
    Undergraduate = 2,
    Postgraduate = 3,
    Doctor = 4,
  }

  /**
   * 求职状态，eg；{0:Unknown,1:AnyTime,2:TwoWeeks,3:OneMoth}
   */
  export enum jobStatus {
    Unknown = 0,
    AnyTime = 1,
    TwoWeeks = 2,
    OneMoth = 3,
  }

  /**
   * 隐私设置，eg；{1:RealName,2:Anonymous}
   */
  export enum privacySettings {
    RealName = 1,
    Anonymous = 2,
  }
}
