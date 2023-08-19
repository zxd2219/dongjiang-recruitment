/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Authority } from "./Authority";
import type { AuthorityGroup } from "./AuthorityGroup";

/**
 * 账号
 */
export type Account = {
  /**
   * 账号ID
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
   * 用户名
   */
  userName: string;
  /**
   * 详情ID
   */
  detailId: {
    /**
     * 管理员
     */
    manager: string | null;
    /**
     * 求职者
     */
    applicant: string | null;
    /**
     * 人事
     */
    personnel: string | null;
    /**
     * 广告商
     */
    advertiser: string | null;
  };
  /**
   * 权限列表
   */
  authorities: Array<Authority>;
  /**
   * 权限组列表
   */
  authorityGroups: Array<AuthorityGroup>;
};
