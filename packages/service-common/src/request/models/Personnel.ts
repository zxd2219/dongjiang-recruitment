/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 人事
 */
export type Personnel = {
  /**
   * 人事ID
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
   * 公司ID
   */
  companyId: string;
  /**
   * 头像地址
   */
  avatarUrl: string;
  /**
   * 人事姓名
   */
  hrName: string;
  /**
   * 职位名称
   */
  postName: string;
  /**
   * 电子邮箱
   */
  acceptEmail: string;
};
