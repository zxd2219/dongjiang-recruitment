/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query, Sort } from "../../interfaces";
import type { JobExpectation } from "../models/JobExpectation";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantJobExpectationService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加求职期望
   * @returns any 成功
   * @throws ApiError
   */
  public addJobExpectation({
    applicantId,
    requestBody,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    requestBody?: {
      /**
       * 职位类型，eg；{1:FullTime,2:PartTime,3:Practice}
       */
      positionType: 1 | 2 | 3;
      /**
       * 细分标签
       */
      directionTags: Array<string>;
      /**
       * 职位名称
       */
      positionName: string;
      /**
       * 单位K
       */
      startingSalary: number;
      /**
       * 单位K
       */
      ceilingSalary: number;
      /**
       * 期望城市
       */
      cityName: string;
    };
  }): CancelablePromise<JobExpectation> {
    return this.httpRequest.request({
      method: "POST",
      url: "/applicant/{applicantId}/jobExpectations",
      path: {
        applicantId: applicantId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询求职期望
   * @returns any 成功
   * @throws ApiError
   */
  public queryJobExpectation({
    applicantId,
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 查询条件
     */
    query?: Query<JobExpectation>;
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
    sort?: Sort<JobExpectation>;
  }): CancelablePromise<{
    /**
     * 求职期望总数
     */
    total: number;
    /**
     * 当页求职期望
     */
    items: Array<JobExpectation>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/jobExpectations",
      path: {
        applicantId: applicantId,
      },
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 移除求职期望
   * @returns any 成功
   * @throws ApiError
   */
  public removeJobExpectation({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 求职期望ID
     */
    id: string;
  }): CancelablePromise<string> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/applicant/{applicantId}/jobExpectations/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }

  /**
   * 获取求职期望
   * @returns any 成功
   * @throws ApiError
   */
  public getJobExpectation({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 求职期望ID
     */
    id: string;
  }): CancelablePromise<JobExpectation> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/jobExpectations/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }

  /**
   * 修改求职期望
   * @returns any 成功
   * @throws ApiError
   */
  public updateJobExpectation({
    applicantId,
    id,
    requestBody,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 求职期望ID
     */
    id: string;
    requestBody?: JobExpectation;
  }): CancelablePromise<JobExpectation> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/applicant/{applicantId}/jobExpectations/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
