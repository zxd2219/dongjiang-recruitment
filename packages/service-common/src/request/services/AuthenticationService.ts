/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { Account } from "../models/Account";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AuthenticationService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 注销账号
   * @returns any 成功
   * @throws ApiError
   */
  public destroyAccount({
    id,
    verificationCode,
  }: {
    /**
     * 账号ID
     */
    id: string;
    /**
     * 验证码
     */
    verificationCode: string;
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
     * 账号ID
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/authentication/actions/destroy/{id}",
      path: {
        id: id,
      },
      query: {
        verificationCode: verificationCode,
      },
    });
  }

  /**
   * 修改密码
   * @returns any 成功
   * @throws ApiError
   */
  public changePassword({
    id,
    requestBody,
  }: {
    /**
     * 账号ID
     */
    id: string;
    requestBody?: {
      /**
       * 密码
       */
      password: string;
      /**
       * 验证码
       */
      verificationCode: string;
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
     * 修改状态
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/authentication/actions/changePassword/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 登录账号
   * @returns any 成功
   * @throws ApiError
   */
  public loginAccount({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 用户名
       */
      userName: string;
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
     * 响应体
     */
    body: {
      /**
       * 授权令牌
       */
      token: string;
      /**
       * 账号
       */
      account: Account;
    };
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/authentication/actions/login",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 忘记密码
   * @returns any 成功
   * @throws ApiError
   */
  public forgetPassword({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 用户名
       */
      userName: string;
      /**
       * 密码
       */
      password: string;
      /**
       * 验证码
       */
      verificationCode: string;
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
     * 忘记状态
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/authentication/actions/forget",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 注册账号
   * @returns any 成功
   * @throws ApiError
   */
  public registerAccount({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 用户名
       */
      userName: string;
      /**
       * 短信验证码
       */
      verificationCode: string;
      /**
       * 账号类型
       */
      accountType: 0 | 1 | 2 | 3;
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
     * 注册状态
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/authentication/actions/register",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
