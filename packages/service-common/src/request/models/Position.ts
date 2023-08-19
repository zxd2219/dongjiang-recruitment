/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Company } from "./Company";
import type { Personnel } from "./Personnel";

/**
 * 职位
 */
export type Position = {
  /**
   * 职位ID
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
   * 职位名称
   */
  positionName: string;
  /**
   * 职位类型
   */
  positionType: string;
  /**
   * 工作年限，eg；{1:NoExperience,2:InSchoolOrFreshGraduate,3:Under3Year,4:With3To5Year,5:With5To10Year,6:MoreThen10Year}
   */
  workingYears: Position.workingYears;
  /**
   * 学历要求，eg；{0:Unlimited,1:JuniorCollege,2:Undergraduate,3:Postgraduate,4:Doctor}
   */
  education: Position.education;
  /**
   * 细分标签
   */
  directionTags: Array<string>;
  /**
   * 单位K
   */
  startingSalary: number;
  /**
   * 单位K
   */
  ceilingSalary: number;
  /**
   * 工作省份
   */
  workProvinceName: string;
  /**
   * 工作城市
   */
  workCityName: string;
  /**
   * 工作地区
   */
  workAreaName: string;
  /**
   * 公司
   */
  company: Company;
  /**
   * 人事
   */
  personnel: Personnel;
  /**
   * 职位类型，eg；{1:FullTime,2:PartTime,3:Practice}
   */
  workType: Position.workType;
  /**
   * 所属部门
   */
  departmentName: string;
  /**
   * 职位亮点
   */
  highlights: Array<string>;
  /**
   * 职位描述
   */
  description: string;
  /**
   * 周末休息时间，eg；{1:Weekends,2:SingleOff,3:SizeWeek}
   */
  weekendReleaseTime: Position.weekendReleaseTime;
  /**
   * 上班时间
   */
  workTime: string;
  /**
   * 下班时间
   */
  overTime: string;
  /**
   * 面试
   */
  interviewInfo: {
    /**
     * 面试形式，eg；{1:OffLine,2:OnLine,3:OnCall}
     */
    situation: Position.situation;
    /**
     * 面试轮数，eg；{1:With1To2Round,2:With3To4Round,3:With5To6Round,4:Uncertain}
     */
    wheel: Position.wheel;
    /**
     * 面试时长，eg；{1:OneTime,2:ManyTime}
     */
    time: Position.time;
    /**
     * 面试说明，eg；{1:Weekend,2:Examination,3:GetOffWork,4:Assignment}
     */
    illustrate: Position.illustrate;
  };
  /**
   * 上班地点
   */
  workingPlace: {
    /**
     * 经度
     */
    longitude: number;
    /**
     * 纬度
     */
    latitude: number;
  };
};

export namespace Position {
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
   * 学历要求，eg；{0:Unlimited,1:JuniorCollege,2:Undergraduate,3:Postgraduate,4:Doctor}
   */
  export enum education {
    Unlimited = 0,
    JuniorCollege = 1,
    Undergraduate = 2,
    Postgraduate = 3,
    Doctor = 4,
  }

  /**
   * 职位类型，eg；{1:FullTime,2:PartTime,3:Practice}
   */
  export enum workType {
    FullTime = 1,
    PartTime = 2,
    Practice = 3,
  }

  /**
   * 周末休息时间，eg；{1:Weekends,2:SingleOff,3:SizeWeek}
   */
  export enum weekendReleaseTime {
    Weekends = 1,
    SingleOff = 2,
    SizeWeek = 3,
  }

  /**
   * 面试形式，eg；{1:OffLine,2:OnLine,3:OnCall}
   */
  export enum situation {
    OffLine = 1,
    OnLine = 2,
    OnCall = 3,
  }

  /**
   * 面试轮数，eg；{1:With1To2Round,2:With3To4Round,3:With5To6Round,4:Uncertain}
   */
  export enum wheel {
    With1To2Round = 1,
    With3To4Round = 2,
    With5To6Round = 3,
    Uncertain = 4,
  }

  /**
   * 面试时长，eg；{1:OneTime,2:ManyTime}
   */
  export enum time {
    OneTime = 1,
    ManyTime = 2,
  }

  /**
   * 面试说明，eg；{1:Weekend,2:Examination,3:GetOffWork,4:Assignment}
   */
  export enum illustrate {
    Weekend = 1,
    Examination = 2,
    GetOffWork = 3,
    Assignment = 4,
  }
}
