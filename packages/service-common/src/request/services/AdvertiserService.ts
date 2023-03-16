/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { Advertiser } from "../models/Advertiser";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AdvertiserService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 修改广告商
   * @returns any 成功
   * @throws ApiError
   */
  public updateAdvertiser({
    id,
    requestBody,
  }: {
    /**
     * 广告商ID，eg：BC810A11-0D52-81A0-bFEA-782148fb1e2F
     */
    id: string;
    requestBody?: Advertiser;
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
    body: Advertiser;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/advertisers/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 获取广告商
   * @returns any 成功
   * @throws ApiError
   */
  public getAdvertiser({
    id,
  }: {
    /**
     * 广告商ID，eg：BC810A11-0D52-81A0-bFEA-782148fb1e2F
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
    body: Advertiser;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/advertisers/{id}",
      path: {
        id: id,
      },
    });
  }

  /**
   * 移除广告商
   * @returns any 成功
   * @throws ApiError
   */
  public removeAdvertiser({
    id,
  }: {
    /**
     * 广告商ID，eg：BC810A11-0D52-81A0-bFEA-782148fb1e2F
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
     * 广告商ID
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/advertisers/{id}",
      path: {
        id: id,
      },
    });
  }

  /**
   * 查询广告商
   * @returns any 成功
   * @throws ApiError
   */
  public queryAdvertiser({
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 查询条件
     */
    query?: Query<Advertiser>;
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
    sort?: Array<`${keyof Advertiser},${"asc" | "desc"}`>;
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
       * 广告商总数
       */
      total: number;
      /**
       * 当页广告商
       */
      items: Array<Advertiser>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/advertisers",
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 添加广告商
   * @returns any 成功
   * @throws ApiError
   */
  public addAdvertiser({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 名称
       */
      name: string;
      /**
       * 网页地址
       */
      pageUrl: string;
      /**
       * Logo地址
       */
      logoUrl: string;
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
    body: Advertiser;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/advertisers",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
