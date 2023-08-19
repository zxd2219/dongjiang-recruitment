/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query, Sort } from "../../interfaces";
import type { Authority } from "../models/Authority";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AuthenticationAuthorityService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加权限
   * @returns any 成功
   * @throws ApiError
   */
  public addAuthority({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 名称
       */
      name: string;
    };
  }): CancelablePromise<Authority> {
    return this.httpRequest.request({
      method: "POST",
      url: "/authentication/authorities",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询权限
   * @returns any 成功
   * @throws ApiError
   */
  public queryAuthority({
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 查询条件
     */
    query?: Query<Authority>;
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
    sort?: Sort<Authority>;
  }): CancelablePromise<{
    /**
     * 权限总数
     */
    total: number;
    /**
     * 当页权限
     */
    items: Array<Authority>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/authentication/authorities",
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 移除权限
   * @returns any 成功
   * @throws ApiError
   */
  public removeAuthority({
    id,
  }: {
    /**
     * 权限ID
     */
    id: string;
  }): CancelablePromise<string> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/authentication/authorities/{id}",
      path: {
        id: id,
      },
    });
  }

  /**
   * 修改账号权限
   * @returns any 成功
   * @throws ApiError
   */
  public updateAuthority({
    id,
    requestBody,
  }: {
    /**
     * 权限ID
     */
    id: string;
    requestBody?: {
      /**
       * 名称
       */
      name: string;
    };
  }): CancelablePromise<Authority> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/authentication/authorities/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 获取权限
   * @returns any 成功
   * @throws ApiError
   */
  public getAuthority({
    id,
  }: {
    /**
     * 权限ID
     */
    id: string;
  }): CancelablePromise<Authority> {
    return this.httpRequest.request({
      method: "GET",
      url: "/authentication/authorities/{id}",
      path: {
        id: id,
      },
    });
  }
}
