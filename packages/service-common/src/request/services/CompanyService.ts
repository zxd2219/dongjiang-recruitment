/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { Company } from "../models/Company";
import type { Position } from "../models/Position";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class CompanyService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加公司
   * @returns any 成功
   * @throws ApiError
   */
  public addCompany({
    requestBody,
  }: {
    requestBody?: {
      /**
       * LOGO地址
       */
      logoUrl: string;
      /**
       * 公司名称
       */
      companyName: string;
      /**
       * 在招职位
       */
      recruitmentPosition: number;
      /**
       * 所在城市
       */
      cityName: string;
      /**
       * {1:未融资,2:天使轮,3:A轮,4:B轮,5:C轮,6:D轮及以上,7:上市公司,8:不需要融资}
       */
      financingStage: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
      /**
       * {1:少于15人,2:15-50人,3:50-150人,4:150-500人,5:500-2000人,6:2000以上}
       */
      scale: 1 | 2 | 3 | 4 | 5 | 6;
      /**
       * 领域名称
       */
      comprehensionName: string;
      /**
       * 详细地址
       */
      address: string;
      /**
       * 扩展
       */
      about: string;
      /**
       * 公司全称
       */
      fullName: string;
      /**
       * 法定代表人
       */
      legalRepresentative: string;
      /**
       * 注册资本
       */
      registeredCapital: string;
      /**
       * 机构类型
       */
      organizationType: string;
      /**
       * 成立时间
       */
      establishmentTime: string;
      /**
       * 公司福利
       */
      benefits: Array<string>;
      /**
       * 公司地点
       */
      location: {
        /**
         * 经度
         */
        longitude: number;
        /**
         * 纬度
         */
        latitude: number;
      };
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
    body: Company;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/companies",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询公司
   * @returns any 成功
   * @throws ApiError
   */
  public queryCompany({
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 查询条件
     */
    query?: Query<Company>;
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
    sort?: Array<`${keyof Company},${"asc" | "desc"}`>;
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
       * 公司总数
       */
      total: number;
      /**
       * 当页公司
       */
      items: Array<Company>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/companies",
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 修改公司
   * @returns any 成功
   * @throws ApiError
   */
  public updateCompany({
    id,
    requestBody,
  }: {
    /**
     * 公司ID
     */
    id: string;
    requestBody?: Company;
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
    body: Company;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/companies/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 获取公司
   * @returns any 成功
   * @throws ApiError
   */
  public getCompany({
    id,
  }: {
    /**
     * 公司ID
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
    body: Company;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/companies/{id}",
      path: {
        id: id,
      },
    });
  }

  /**
   * 查询所有职位
   * @returns any 成功
   * @throws ApiError
   */
  public queryAllPosition({
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 查询条件
     */
    query?: Query<Position>;
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
    sort?: Array<`${keyof Position},${"asc" | "desc"}`>;
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
       * 职位总数
       */
      total: number;
      /**
       * 当页职位
       */
      items: Array<Position>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/companies/positions",
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 获取历史大数据
   * @returns any 成功
   * @throws ApiError
   */
  public getBigData({
    companyId,
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 公司ID
     */
    companyId: string;
    /**
     * 查询条件
     */
    query?: string;
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
    sort?: Array<string>;
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
    /**
     * 历史大数据列表
     */
    body: Array<{
      /**
       * 记录日期
       */
      date: string;
      /**
       * 浏览记录数量
       */
      inspectionRecordCount: number;
      /**
       * 投递记录数量
       */
      deliveryRecordCount: number;
      /**
       * 在线沟通数量
       */
      onlineCommunicateCount: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/companies/{companyId}/bigData",
      path: {
        companyId: companyId,
      },
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }
}
