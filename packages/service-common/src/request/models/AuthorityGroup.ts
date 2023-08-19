/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Authority } from "./Authority";

/**
 * 权限组
 */
export type AuthorityGroup = {
  /**
   * 权限组ID
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
   * 权限列表
   */
  authorities: Array<Authority>;
};
