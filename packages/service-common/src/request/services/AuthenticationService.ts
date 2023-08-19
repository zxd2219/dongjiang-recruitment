/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from "../models/Account";
import type { Company } from "../models/Company";

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
  }): CancelablePromise<string> {
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
  }): CancelablePromise<string> {
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
     * 授权令牌
     */
    token: string;
    /**
     * 账号
     */
    account: Account;
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
  }): CancelablePromise<string> {
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
    };
  }): CancelablePromise<Account> {
    return this.httpRequest.request({
      method: "POST",
      url: "/authentication/actions/register",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
