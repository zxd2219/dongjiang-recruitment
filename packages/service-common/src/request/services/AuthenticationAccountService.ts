/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { Account } from "../models/Account";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AuthenticationAccountService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加账号
   * @returns any 成功
   * @throws ApiError
   */
  public addAccount({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 账号类型
       */
      accountType: 0 | 1 | 2 | 3;
      /**
       * 用户名
       */
      userName: string;
      /**
       * 密码
       */
      password: string;
      /**
       * 详细信息
       */
      detail?:
        | {
            /**
             * 名称
             */
            name: string;
            /**
             * 网页地址
             */
            pageUrl: string;
            /**
             * Logo地址
             */
            logoUrl: string;
          }
        | {
            /**
             * 头像地址
             */
            avatarUrl: string;
            /**
             * 姓
             */
            firstName: string;
            /**
             * 名
             */
            lastName: string;
            /**
             * 生日
             */
            dateOfBirth: string;
            /**
             * 性别
             */
            sex: string;
            /**
             * 年龄
             */
            age: number;
            /**
             * 所在城市
             */
            cityName: string;
            /**
             * 电子邮箱
             */
            email: string;
            /**
             * {1:没有工作经验,2:在校/应届,3:3年一下,4:3-5年,5:5-10年,6:10年以上}
             */
            workingYears: 1 | 2 | 3 | 4 | 5 | 6;
            /**
             * {0:未知,1:大专,2:本科,3:硕士,4:博士}
             */
            education: 0 | 1 | 2 | 3 | 4;
            /**
             * 个人优势
             */
            personalAdvantage: string;
            /**
             * 社交主页
             */
            socialHomepage: string;
            /**
             * {1:随时入职,2:2周内入职,3:1月内入职}
             */
            jobStatus: 0 | 1 | 2 | 3;
            /**
             * 图片作品
             */
            pictureWorks: Array<string>;
            /**
             * {1:实名,2:匿名}
             */
            privacySettings: 1 | 2;
          }
        | {
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
    };
  }): CancelablePromise<{
    /**
     * 响应时间
     */
    timestamp: string;
    /**
     * 响应
     */
    message: string;
    /**
     * 响应编码
     */
    status: number;
    /**
     * 账号
     */
    body: Account;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/authentication/accounts",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询账号
   * @returns any 成功
   * @throws ApiError
   */
  public queryAccounts({
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 查询条件
     */
    query?: Query<Account>;
    /**
     * 当前页数
     */
    page?: number;
    /**
     * 页面大小
     */
    size?: number;
    /**
     * 排序方式
     */
    sort?: Array<`${keyof Account},${"asc" | "desc"}`>;
  }): CancelablePromise<{
    /**
     * 响应时间
     */
    timestamp: string;
    /**
     * 响应
     */
    message: string;
    /**
     * 响应编码
     */
    status: number;
    /**
     * 分页结果
     */
    body: {
      /**
       * 账号总数
       */
      total: number;
      /**
       * 当页账号
       */
      items: Array<Account>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/authentication/accounts",
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 移除账号
   * @returns any 成功
   * @throws ApiError
   */
  public removeAccount({
    id,
  }: {
    /**
     * 账号ID
     */
    id: string;
  }): CancelablePromise<{
    /**
     * 响应时间
     */
    timestamp: string;
    /**
     * 响应
     */
    message: string;
    /**
     * 响应编码
     */
    status: number;
    /**
     * 账户ID
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/authentication/accounts/{id}",
      path: {
        id: id,
      },
    });
  }

  /**
   * 修改账号
   * @returns any 成功
   * @throws ApiError
   */
  public updateAccount({
    id,
    requestBody,
  }: {
    /**
     * 账号ID
     */
    id: string;
    requestBody?: {
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
      /**
       * 密码
       */
      password: string;
    };
  }): CancelablePromise<{
    /**
     * 响应时间
     */
    timestamp: string;
    /**
     * 响应
     */
    message: string;
    /**
     * 响应编码
     */
    status: number;
    /**
     * 账号
     */
    body: Account;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/authentication/accounts/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 获取账号
   * @returns any 成功
   * @throws ApiError
   */
  public getAccount({
    id,
  }: {
    /**
     * 账号ID
     */
    id: string;
  }): CancelablePromise<{
    /**
     * 响应时间
     */
    timestamp: string;
    /**
     * 响应
     */
    message: string;
    /**
     * 响应编码
     */
    status: number;
    /**
     * 账号
     */
    body: Account;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/authentication/accounts/{id}",
      path: {
        id: id,
      },
    });
  }
}
