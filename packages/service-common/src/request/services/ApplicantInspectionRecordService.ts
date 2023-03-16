/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { ApplicantInspectionRecord } from "../models/ApplicantInspectionRecord";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantInspectionRecordService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 移除查看记录
   * @returns any 成功
   * @throws ApiError
   */
  public removeUserInspectionRecord({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 查看记录ID
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
     * 查看记录ID
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/applicant/{applicantId}/inspectionRecords/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }

  /**
   * 获取查看记录
   * 获取求职者查看记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getUserInspectionRecord({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 查看记录ID
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
    body: ApplicantInspectionRecord;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/inspectionRecords/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }

  /**
   * 查询查看记录
   * @returns any 成功
   * @throws ApiError
   */
  public queryUserInspectionRecord({
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
      url: "/applicant/{applicantId}/inspectionRecords",
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
   * 添加查看记录
   * @returns any 成功
   * @throws ApiError
   */
  public addUserInspectionRecord({
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
    body: ApplicantInspectionRecord;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/applicant/{applicantId}/inspectionRecords",
      path: {
        applicantId: applicantId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
