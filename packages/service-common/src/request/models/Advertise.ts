/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Advertiser } from "./Advertiser";

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
  deletedAt: string | null;
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
   * 投放位置，eg；{1:Master,2:Popularize}
   */
  position: Advertise.position;
  /**
   * 投放状态，eg；{1:Active,2:Inactive}
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
  /**
   * 广告商
   */
  advertiser: Advertiser;
};

export namespace Advertise {
  /**
   * 投放位置，eg；{1:Master,2:Popularize}
   */
  export enum position {
    Master = 1,
    Popularize = 2,
  }

  /**
   * 投放状态，eg；{1:Active,2:Inactive}
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
