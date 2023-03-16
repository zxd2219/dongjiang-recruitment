/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { GarnerRecord } from "../models/GarnerRecord";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantGarnerRecordService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加收藏记录
   * @returns any 成功
   * @throws ApiError
   */
  public addGarnerRecord({
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
    body: GarnerRecord;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/applicant/{applicantId}/garnerRecords",
      path: {
        applicantId: applicantId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询收藏记录
   * @returns any 成功
   * @throws ApiError
   */
  public queryGarnerRecord({
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
    query?: Query<GarnerRecord>;
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
    sort?: Array<`${keyof GarnerRecord},${"asc" | "desc"}`>;
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
       * 收藏记录总数
       */
      total: number;
      /**
       * 当页收藏记录
       */
      items: Array<GarnerRecord>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/garnerRecords",
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
   * 移除收藏记录
   * @returns any 成功
   * @throws ApiError
   */
  public removeGarnerRecord({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 收藏记录ID
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
     * 收藏记录ID
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/applicant/{applicantId}/garnerRecords/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }

  /**
   * 获取收藏记录
   * @returns any 成功
   * @throws ApiError
   */
  public getGarnerRecord({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 收藏记录ID
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
    body: GarnerRecord;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/garnerRecords/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }
}
