/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { Personnel } from "../models/Personnel";
import type { PersonnelInspectionRecord } from "../models/PersonnelInspectionRecord";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class PersonnelService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加人事
   * @returns any 成功
   * @throws ApiError
   */
  public addPersonnel({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 公司ID
       */
      companyId: string;
      /**
       * 头像地址
       */
      avatarUrl: string;
      /**
       * 人事姓名
       */
      hrName: string;
      /**
       * 职位名称
       */
      postName: string;
      /**
       * 电子邮箱
       */
      acceptEmail: string;
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
    body: Personnel;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/personnel",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询人事
   * @returns any 成功
   * @throws ApiError
   */
  public queryPersonnel({
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 查询条件
     */
    query?: Query<Personnel>;
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
    sort?: Array<`${keyof Personnel},${"asc" | "desc"}`>;
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
       * 人事总数
       */
      total: number;
      /**
       * 当页人事
       */
      items: Array<Personnel>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/personnel",
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 移除人事
   * @returns any 成功
   * @throws ApiError
   */
  public removePersonnel({
    id,
  }: {
    /**
     * 人事ID
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
     * 人事ID
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/personnel/{id}",
      path: {
        id: id,
      },
    });
  }

  /**
   * 修改人事
   * @returns any 成功
   * @throws ApiError
   */
  public updatePersonnel({
    id,
    requestBody,
  }: {
    /**
     * 人事ID
     */
    id: string;
    requestBody?: Personnel;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 响应状态
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    body: Personnel;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/personnel/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 获取人事
   * @returns any 成功
   * @throws ApiError
   */
  public getPersonnel({
    id,
  }: {
    /**
     * 人事ID
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
    body: Personnel;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/personnel/{id}",
      path: {
        id: id,
      },
    });
  }

  /**
   * 查询所有人事查看记录
   * @returns any 成功
   * @throws ApiError
   */
  public queryAllPersonnelInspectionRecord({
    query,
    page,
    size,
    sort,
  }: {
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
      url: "/personnel/inspectionRecords",
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }
}
