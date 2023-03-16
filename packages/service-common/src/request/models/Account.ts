/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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
  deletedAt: string;
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
    manager: string;
    /**
     * 求职者
     */
    applicant: string;
    /**
     * 人事
     */
    personnel: string;
    /**
     * 广告商
     */
    advertiser: string;
  };
  /**
   * 权限列表
   */
  authorities: Array<string>;
  /**
   * 权限组列表
   */
  groups: Array<string>;
};
