/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 广告
 */
export type Advertise = {
  /**
   * 广告ID
   */
  id: string;
  /**
   * 创建时间
   */
  createdAt: string;
  /**
   * 修改时间
   */
  updatedAt: string;
  /**
   * 移除时间
   */
  deletedAt: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 网页地址
   */
  pageUrl: string;
  /**
   * 图片地址
   */
  banner: string;
  /**
   * {1:Master}
   */
  position: Advertise.position;
  /**
   * {1:Active,2:Expired}
   */
  status: Advertise.status;
  /**
   * 已缴费用
   */
  payed: Advertise.payed;
  /**
   * 开始时间
   */
  startTime: string;
  /**
   * 结束时间
   */
  endTime: string;
};

export namespace Advertise {
  /**
   * {1:Master}
   */
  export enum position {
    Master = 1,
  }

  /**
   * {1:Active,2:Expired}
   */
  export enum status {
    Active = 1,
    Inactive = 2,
  }

  /**
   * 已缴费用
   */
  export enum payed {
    Active = 1,
    Expired = 2,
  }
}
