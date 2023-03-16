/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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
  deletedAt: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 权限列表
   */
  authorities: Array<string>;
};
