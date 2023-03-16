/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { Position } from "../models/Position";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class CompanyPositionService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加职位
   * @returns any 成功
   * @throws ApiError
   */
  public addPosition({
    companyId,
    requestBody,
  }: {
    /**
     * 公司ID
     */
    companyId: string;
    requestBody?: {
      /**
       * 职位名称
       */
      positionName: string;
      /**
       * 职位类型
       */
      positionType: string;
      /**
       * {1:经验不限,2:在校/应届,3:3年及以下,4:3-5年,5:5-10年,6:10年以上}
       */
      workingYears: 1 | 2 | 3 | 4 | 5 | 6;
      /**
       * {1:不要求,2:大专,3:本科,4:硕士,5:博士}
       */
      education: 0 | 1 | 2 | 3 | 4;
      /**
       * 细分标签
       */
      directionTags: Array<string>;
      /**
       * 单位K
       */
      startingSalary: number;
      /**
       * 单位K
       */
      ceilingSalary: number;
      /**
       * 工作省份
       */
      workProvinceName: string;
      /**
       * 工作城市
       */
      workCityName: string;
      /**
       * 工作地区
       */
      workAreaName: string;
      /**
       * 公司ID
       */
      companyId: string;
      /**
       * 人事ID
       */
      personnelId: string;
      /**
       * {1:全职,2:兼职,3:实习}
       */
      workType: 1 | 2 | 3;
      /**
       * 所属部门
       */
      departmentName: string;
      /**
       * 职位亮点
       */
      highlights: Array<string>;
      /**
       * 职位描述
       */
      description: string;
      /**
       * {1:周末双休:,2:周末单休,3:大小周}
       */
      weekendReleaseTime: 1 | 2 | 3;
      /**
       * 上班时间
       */
      workTime: string;
      /**
       * 下班时间
       */
      overTime: string;
      /**
       * 面试
       */
      interviewInfo: {
        /**
         * {1:现场面试,2:视频面试,3:电话面试}
         */
        situation: 1 | 2 | 3;
        /**
         * {1:1-2轮次,2:3-4轮次,3:5-6轮次,4:暂不确定}
         */
        wheel: 1 | 2 | 3 | 4;
        /**
         * {1:一天内完成,2:分多次完成}
         */
        time: 1 | 2;
        /**
         * {1:可周末面试,2:包含笔试,3:可下班面试,4:包含面试作业}
         */
        illustrate: 1 | 2 | 3 | 4;
      };
      /**
       * 上班地点
       */
      workingPlace: {
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
    body: Position;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/companies/{companyId}/positions",
      path: {
        companyId: companyId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询职位
   * @returns any 成功
   * @throws ApiError
   */
  public queryPosition({
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
      url: "/companies/{companyId}/positions",
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

  /**
   * 移除职位
   * @returns any 成功
   * @throws ApiError
   */
  public removePosition({
    companyId,
    id,
  }: {
    /**
     * 公司ID
     */
    companyId: string;
    /**
     * 职位ID
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
     * 职位ID
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/companies/{companyId}/positions/{id}",
      path: {
        companyId: companyId,
        id: id,
      },
    });
  }

  /**
   * 修改职位
   * @returns any 成功
   * @throws ApiError
   */
  public updatePosition({
    companyId,
    id,
    requestBody,
  }: {
    /**
     * 公司ID
     */
    companyId: string;
    /**
     * 职位ID
     */
    id: string;
    requestBody?: Position;
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
    body: Position;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/companies/{companyId}/positions/{id}",
      path: {
        companyId: companyId,
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 获取职位
   * @returns any 成功
   * @throws ApiError
   */
  public getPosition({
    companyId,
    id,
  }: {
    /**
     * 公司ID
     */
    companyId: string;
    /**
     * 职位ID
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
    body: Position;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/companies/{companyId}/positions/{id}",
      path: {
        companyId: companyId,
        id: id,
      },
    });
  }
}
