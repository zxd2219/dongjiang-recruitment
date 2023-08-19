/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 公司
 */
export type Company = {
  /**
   * 公司ID
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
   * LOGO地址
   */
  logoUrl: string;
  /**
   * 公司名称
   */
  companyName: string;
  /**
   * 在招职位
   */
  recruitmentPosition: number;
  /**
   * 所在城市
   */
  cityName: string;
  /**
   * 融资阶段，eg；{1:NoFinanced,2:AngelWheel,3:ARound,4:BRound,5:CRound,6:DAndMoreRound,7:ListedCompany,8:NoRequired}
   */
  financingStage: Company.financingStage;
  /**
   * 公司规模，eg；{1:LessThan15People,2:With15To50People,3:With50To150People,4:With150To500People,5:With500To2000People,6:MoreThen2000People}
   */
  scale: Company.scale;
  /**
   * 领域名称
   */
  comprehensionName: string;
  /**
   * 详细地址
   */
  address: string;
  /**
   * 扩展
   */
  about: string;
  /**
   * 公司全称
   */
  fullName: string;
  /**
   * 法定代表人
   */
  legalRepresentative: string;
  /**
   * 注册资本
   */
  registeredCapital: string;
  /**
   * 机构类型
   */
  organizationType: string;
  /**
   * 成立时间
   */
  establishmentTime: string;
  /**
   * 公司福利
   */
  benefits: Array<string>;
  /**
   * 公司地点
   */
  location: {
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

export namespace Company {
  /**
   * 融资阶段，eg；{1:NoFinanced,2:AngelWheel,3:ARound,4:BRound,5:CRound,6:DAndMoreRound,7:ListedCompany,8:NoRequired}
   */
  export enum financingStage {
    NoFinanced = 1,
    AngelWheel = 2,
    ARound = 3,
    BRound = 4,
    CRound = 5,
    DAndMoreRound = 6,
    ListedCompany = 7,
    NoRequired = 8,
  }

  /**
   * 公司规模，eg；{1:LessThan15People,2:With15To50People,3:With50To150People,4:With150To500People,5:With500To2000People,6:MoreThen2000People}
   */
  export enum scale {
    LessThan15People = 1,
    With15To50People = 2,
    With50To150People = 3,
    With150To500People = 4,
    With500To2000People = 5,
    MoreThen2000People = 6,
  }
}
