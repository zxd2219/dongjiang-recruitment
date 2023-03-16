/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { AttentionRecord } from "../models/AttentionRecord";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantAttentionRecordService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加关注记录
   * @returns any 成功
   * @throws ApiError
   */
  public addAttentionRecord({
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
    body: AttentionRecord;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/applicant/{applicantId}/attentionRecords",
      path: {
        applicantId: applicantId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询关注记录
   * @returns any 成功
   * @throws ApiError
   */
  public queryAttentionRecord({
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
    query?: Query<AttentionRecord>;
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
    sort?: Array<`${keyof AttentionRecord},${"asc" | "desc"}`>;
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
       * 关注记录总数
       */
      total: number;
      /**
       * 当页关注记录
       */
      items: Array<AttentionRecord>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/attentionRecords",
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
   * 移除关注记录
   * @returns any 成功
   * @throws ApiError
   */
  public removeAttentionRecord({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 关注记录ID
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
     * 关注记录ID
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/applicant/{applicantId}/attentionRecords/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }

  /**
   * 获取关注记录
   * @returns any 成功
   * @throws ApiError
   */
  public getAttentionRecord({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 关注记录ID
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
    body: AttentionRecord;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/attentionRecords/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }
}
