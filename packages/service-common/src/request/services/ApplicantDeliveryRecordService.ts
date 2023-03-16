/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { DeliveryRecord } from "../models/DeliveryRecord";

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
       * 求职者ID
       */
      applicantId: string;
      /**
       * {1:待查看,2:已查看,3:通过筛选,4:约面试,5:不合适}
       */
      status: 1 | 2 | 3 | 4 | 5;
      /**
       * 面试时间
       */
      interviewTime: string;
      /**
       * 公司ID
       */
      companyId: string;
      /**
       * 职位ID
       */
      positionId: string;
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
    body: DeliveryRecord;
  }> {
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
     * 投递记录ID
     */
    body: string;
  }> {
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
    body: DeliveryRecord;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/deliveryRecords/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }
}
