/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query, Sort } from "../../interfaces";
import type { Applicant } from "../models/Applicant";
import type { Company } from "../models/Company";
import type { GarnerRecord } from "../models/GarnerRecord";
import type { Position } from "../models/Position";

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
       * 求职者
       */
      applicant: Applicant;
      /**
       * 公司
       */
      company: Company;
      /**
       * 职位
       */
      position: Position;
    };
  }): CancelablePromise<GarnerRecord> {
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
    sort?: Sort<GarnerRecord>;
  }): CancelablePromise<{
    /**
     * 收藏记录总数
     */
    total: number;
    /**
     * 当页收藏记录
     */
    items: Array<GarnerRecord>;
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
  }): CancelablePromise<string> {
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
  }): CancelablePromise<GarnerRecord> {
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
