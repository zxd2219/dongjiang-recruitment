/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
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
    body: Applicant;
  }> {
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
    sort?: Array<`${keyof Applicant},${"asc" | "desc"}`>;
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
       * 求职者总数
       */
      total: number;
      /**
       * 当页求职者
       */
      items: Array<Applicant>;
    };
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
    body: Applicant;
  }> {
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
     * 求职者ID
     */
    body: string;
  }> {
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
    body: Applicant;
  }> {
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
    sort?: Array<`${keyof DeliveryRecord},${"asc" | "desc"}`>;
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
       * 投递记录总数
       */
      total: number;
      /**
       * 当页投递记录
       */
      items: Array<DeliveryRecord>;
    };
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
    sort?: Array<`${keyof ApplicantInspectionRecord},${"asc" | "desc"}`>;
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
       * 查看记录总数
       */
      total: number;
      /**
       * 当页查看记录
       */
      items: Array<ApplicantInspectionRecord>;
    };
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
