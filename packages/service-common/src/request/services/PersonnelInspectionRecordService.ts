/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { PersonnelInspectionRecord } from "../models/PersonnelInspectionRecord";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class PersonnelInspectionRecordService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 移除查看记录
   * @returns any 成功
   * @throws ApiError
   */
  public removeHrInspectionRecord({
    personnelId,
    id,
  }: {
    /**
     * 人事ID
     */
    personnelId: string;
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
      url: "/personnel/{personnelId}/inspectionRecords/{id}",
      path: {
        personnelId: personnelId,
        id: id,
      },
    });
  }

  /**
   * 获取查看记录
   * @returns any 成功
   * @throws ApiError
   */
  public getHrInspectionRecord({
    personnelId,
    id,
  }: {
    /**
     * 人事ID
     */
    personnelId: string;
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
    body: PersonnelInspectionRecord;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/personnel/{personnelId}/inspectionRecords/{id}",
      path: {
        personnelId: personnelId,
        id: id,
      },
    });
  }

  /**
   * 查询查看记录
   * @returns any 成功
   * @throws ApiError
   */
  public queryHrInspectionRecord({
    personnelId,
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 人事ID
     */
    personnelId: string;
    /**
     * 查询条件
     */
    query?: Query<PersonnelInspectionRecord>;
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
    sort?: Array<`${keyof PersonnelInspectionRecord},${"asc" | "desc"}`>;
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
      items: Array<PersonnelInspectionRecord>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/personnel/{personnelId}/inspectionRecords",
      path: {
        personnelId: personnelId,
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
  public addHrInspectionRecord({
    personnelId,
    requestBody,
  }: {
    /**
     * 人事ID
     */
    personnelId: string;
    requestBody?: {
      /**
       * 人事ID
       */
      personnelId: string;
      /**
       * 求职者ID
       */
      applicantId: string;
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
    body: PersonnelInspectionRecord;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/personnel/{personnelId}/inspectionRecords",
      path: {
        personnelId: personnelId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
