/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query, Sort } from "../../interfaces";
import type { Applicant } from "../models/Applicant";
import type { ApplicantInspectionRecord } from "../models/ApplicantInspectionRecord";
import type { DeliveryRecord } from "../models/DeliveryRecord";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加求职者
   * @returns any 成功
   * @throws ApiError
   */
  public addApplicant({
    requestBody,
  }: {
    requestBody?: {
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
    };
  }): CancelablePromise<Applicant> {
    return this.httpRequest.request({
      method: "POST",
      url: "/applicant",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询求职者
   * @returns any 成功
   * @throws ApiError
   */
  public queryApplicant({
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 查询条件
     */
    query?: Query<Applicant>;
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
    sort?: Sort<Applicant>;
  }): CancelablePromise<{
    /**
     * 求职者总数
     */
    total: number;
    /**
     * 当页求职者
     */
    items: Array<Applicant>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant",
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 修改求职者
   * @returns any 成功
   * @throws ApiError
   */
  public updateApplicant({
    id,
    requestBody,
  }: {
    /**
     * 求职者ID
     */
    id: string;
    requestBody?: Applicant;
  }): CancelablePromise<Applicant> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/applicant/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 移除求职者
   * @returns any 成功
   * @throws ApiError
   */
  public removeApplicant({
    id,
  }: {
    /**
     * 求职者ID
     */
    id: string;
  }): CancelablePromise<string> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/applicant/{id}",
      path: {
        id: id,
      },
    });
  }

  /**
   * 获取求职者
   * @returns any 成功
   * @throws ApiError
   */
  public getApplicant({
    id,
  }: {
    /**
     * 求职者ID
     */
    id: string;
  }): CancelablePromise<Applicant> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{id}",
      path: {
        id: id,
      },
    });
  }

  /**
   * 查询所有投递记录
   * @returns any 成功
   * @throws ApiError
   */
  public queryAllDeliveryRecord({
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 查询条件
     */
    query?: Query<DeliveryRecord>;
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
    sort?: Sort<DeliveryRecord>;
  }): CancelablePromise<{
    /**
     * 投递记录总数
     */
    total: number;
    /**
     * 当页投递记录
     */
    items: Array<DeliveryRecord>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/deliveryRecords",
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 查询所有求职者查看记录
   * @returns any 成功
   * @throws ApiError
   */
  public queryAllApplicantInspectionRecord({
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 查询条件
     */
    query?: Query<ApplicantInspectionRecord>;
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
    sort?: Sort<ApplicantInspectionRecord>;
  }): CancelablePromise<{
    /**
     * 查看记录总数
     */
    total: number;
    /**
     * 当页查看记录
     */
    items: Array<ApplicantInspectionRecord>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/inspectionRecords",
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }
}
