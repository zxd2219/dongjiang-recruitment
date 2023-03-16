/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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
  deletedAt: string;
  /**
   * 职位名称
   */
  positionName: string;
  /**
   * 职位类型
   */
  positionType: string;
  /**
   * {1:经验不限,2:在校/应届,3:3年及以下,4:3-5年,5:5-10年,6:10年以上}
   */
  workingYears: Position.workingYears;
  /**
   * {1:不要求,2:大专,3:本科,4:硕士,5:博士}
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
   * 公司ID
   */
  companyId: string;
  /**
   * 人事ID
   */
  personnelId: string;
  /**
   * {1:全职,2:兼职,3:实习}
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
   * {1:周末双休:,2:周末单休,3:大小周}
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
     * {1:现场面试,2:视频面试,3:电话面试}
     */
    situation: Position.situation;
    /**
     * {1:1-2轮次,2:3-4轮次,3:5-6轮次,4:暂不确定}
     */
    wheel: Position.wheel;
    /**
     * {1:一天内完成,2:分多次完成}
     */
    time: Position.time;
    /**
     * {1:可周末面试,2:包含笔试,3:可下班面试,4:包含面试作业}
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
   * {1:经验不限,2:在校/应届,3:3年及以下,4:3-5年,5:5-10年,6:10年以上}
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
   * {1:不要求,2:大专,3:本科,4:硕士,5:博士}
   */
  export enum education {
    Unlimited = 0,
    JuniorCollege = 1,
    Undergraduate = 2,
    Postgraduate = 3,
    Doctor = 4,
  }

  /**
   * {1:全职,2:兼职,3:实习}
   */
  export enum workType {
    FullTime = 1,
    PartTime = 2,
    Practice = 3,
  }

  /**
   * {1:周末双休:,2:周末单休,3:大小周}
   */
  export enum weekendReleaseTime {
    Weekends = 1,
    SingleOff = 2,
    SizeWeek = 3,
  }

  /**
   * {1:现场面试,2:视频面试,3:电话面试}
   */
  export enum situation {
    OffLine = 1,
    OnLine = 2,
    OnCall = 3,
  }

  /**
   * {1:1-2轮次,2:3-4轮次,3:5-6轮次,4:暂不确定}
   */
  export enum wheel {
    With1To2Round = 1,
    With3To4Round = 2,
    With5To6Round = 3,
    Uncertain = 4,
  }

  /**
   * {1:一天内完成,2:分多次完成}
   */
  export enum time {
    OneTime = 1,
    ManyTime = 2,
  }

  /**
   * {1:可周末面试,2:包含笔试,3:可下班面试,4:包含面试作业}
   */
  export enum illustrate {
    Weekend = 1,
    Examination = 2,
    GetOffWork = 3,
    Assignment = 4,
  }
}
