/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { AuthorityGroup } from "../models/AuthorityGroup";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AuthenticationAuthorityGroupService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加权限组
   * @returns any 成功
   * @throws ApiError
   */
  public addAuthorityGroup({
    requestBody,
  }: {
    requestBody?: AuthorityGroup;
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
    body: AuthorityGroup;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/authentication/authorityGroups",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询权限组
   * @returns any 成功
   * @throws ApiError
   */
  public queryAuthorityGroup({
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 查询条件
     */
    query?: Query<AuthorityGroup>;
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
    sort?: Array<`${keyof AuthorityGroup},${"asc" | "desc"}`>;
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
       * 权限组总数
       */
      total: number;
      /**
       * 当页权限组
       */
      items: Array<AuthorityGroup>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/authentication/authorityGroups",
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 移除权限组
   * @returns any 成功
   * @throws ApiError
   */
  public removeAuthorityGroup({
    id,
  }: {
    /**
     * 权限组ID
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
     * 权限组ID
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/authentication/authorityGroups/{id}",
      path: {
        id: id,
      },
    });
  }

  /**
   * 修改权限组
   * @returns any 成功
   * @throws ApiError
   */
  public updateAuthorityGroup({
    id,
    requestBody,
  }: {
    /**
     * 权限组ID
     */
    id: string;
    requestBody?: AuthorityGroup;
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
    body: AuthorityGroup;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/authentication/authorityGroups/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 获取权限组
   * @returns any 成功
   * @throws ApiError
   */
  public getAuthorityGroup({
    id,
  }: {
    /**
     * 权限组ID
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
    body: AuthorityGroup;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/authentication/authorityGroups/{id}",
      path: {
        id: id,
      },
    });
  }
}
