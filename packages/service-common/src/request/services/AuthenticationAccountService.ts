/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query, Sort } from "../../interfaces";
import type { Account } from "../models/Account";
import type { Authority } from "../models/Authority";
import type { AuthorityGroup } from "../models/AuthorityGroup";
import type { Company } from "../models/Company";

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
             * 工作年限，eg；{1:NoExperience,2:InSchoolOrFreshGraduate,3:Under3Year,4:With3To5Year,5:With5To10Year,6:MoreThen10Year}
             */
            workingYears: 1 | 2 | 3 | 4 | 5 | 6;
            /**
             * 学历状态，eg；{0:Unknown,1:JuniorCollege,2:Undergraduate,3:Postgraduate,4:Doctor}
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
             * 求职状态，eg；{0:Unknown,1:AnyTime,2:TwoWeeks,3:OneMoth}
             */
            jobStatus: 0 | 1 | 2 | 3;
            /**
             * 图片作品
             */
            pictureWorks: Array<string>;
            /**
             * 隐私设置，eg；{1:RealName,2:Anonymous}
             */
            privacySettings: 1 | 2;
          }
        | {
            /**
             * 公司
             */
            company: Company;
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
      /**
       * 权限
       */
      authorities: Array<Authority>;
      /**
       * 权限组
       */
      authorityGroups: Array<AuthorityGroup>;
    };
  }): CancelablePromise<Account> {
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
    sort?: Sort<Account>;
  }): CancelablePromise<{
    /**
     * 账号总数
     */
    total: number;
    /**
     * 当页账号
     */
    items: Array<Account>;
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
  }): CancelablePromise<string> {
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
      /**
       * 密码
       */
      password: string;
    };
  }): CancelablePromise<Account> {
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
  }): CancelablePromise<Account> {
    return this.httpRequest.request({
      method: "GET",
      url: "/authentication/accounts/{id}",
      path: {
        id: id,
      },
    });
  }
}
