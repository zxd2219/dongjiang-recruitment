/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query, Sort } from "../../interfaces";
import type { Applicant } from "../models/Applicant";
import type { Company } from "../models/Company";
import type { DeliveryRecord } from "../models/DeliveryRecord";
import type { Position } from "../models/Position";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantDeliveryRecordService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加投递记录
   * @returns any 成功
   * @throws ApiError
   */
  public addDeliveryRecord({
    applicantId,
    requestBody,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    requestBody?: {
      /**
       * 求职者
       */
      applicant: Applicant;
      /**
       * 投递状态，eg；{1:UnViewed,2:Viewed,3:PassFilter,4:Interview,5:Inappropriate}
       */
      status: 1 | 2 | 3 | 4 | 5;
      /**
       * 面试时间
       */
      interviewTime: string;
      /**
       * 公司
       */
      company: Company;
      /**
       * 职位
       */
      position: Position;
    };
  }): CancelablePromise<DeliveryRecord> {
    return this.httpRequest.request({
      method: "POST",
      url: "/applicant/{applicantId}/deliveryRecords",
      path: {
        applicantId: applicantId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询投递记录
   * @returns any 成功
   * @throws ApiError
   */
  public queryDeliveryRecord({
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
      url: "/applicant/{applicantId}/deliveryRecords",
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
   * 移除投递记录
   * @returns any 成功
   * @throws ApiError
   */
  public removeDeliveryRecord({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 投递记录ID
     */
    id: string;
  }): CancelablePromise<string> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/applicant/{applicantId}/deliveryRecords/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }

  /**
   * 获取投递记录
   * @returns any 成功
   * @throws ApiError
   */
  public getDeliveryRecord({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 投递记录ID
     */
    id: string;
  }): CancelablePromise<DeliveryRecord> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/deliveryRecords/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }

  /**
   * 修改投递记录
   * @returns any 成功
   * @throws ApiError
   */
  public updateDeliveryRecord({
    applicantId,
    id,
    requestBody,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 投递记录ID
     */
    id: string;
    requestBody?: DeliveryRecord;
  }): CancelablePromise<DeliveryRecord> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/applicant/{applicantId}/deliveryRecords/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
