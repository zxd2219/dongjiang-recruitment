/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query, Sort } from "../../interfaces";
import type { Company } from "../models/Company";
import type { Personnel } from "../models/Personnel";
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
       * 工作年限，eg；{1:NoExperience,2:InSchoolOrFreshGraduate,3:Under3Year,4:With3To5Year,5:With5To10Year,6:MoreThen10Year}
       */
      workingYears: 1 | 2 | 3 | 4 | 5 | 6;
      /**
       * 学历要求，eg；{0:Unlimited,1:JuniorCollege,2:Undergraduate,3:Postgraduate,4:Doctor}
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
       * 公司
       */
      company: Company;
      /**
       * 人事
       */
      personnel: Personnel;
      /**
       * 职位类型，eg；{1:FullTime,2:PartTime,3:Practice}
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
       * 周末休息时间，eg；{1:Weekends,2:SingleOff,3:SizeWeek}
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
         * 面试形式，eg；{1:OffLine,2:OnLine,3:OnCall}
         */
        situation: 1 | 2 | 3;
        /**
         * 面试轮数，eg；{1:With1To2Round,2:With3To4Round,3:With5To6Round,4:Uncertain}
         */
        wheel: 1 | 2 | 3 | 4;
        /**
         * 面试时长，eg；{1:OneTime,2:ManyTime}
         */
        time: 1 | 2;
        /**
         * 面试说明，eg；{1:Weekend,2:Examination,3:GetOffWork,4:Assignment}
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
  }): CancelablePromise<Position> {
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
    sort?: Sort<Position>;
  }): CancelablePromise<{
    /**
     * 职位总数
     */
    total: number;
    /**
     * 当页职位
     */
    items: Array<Position>;
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
  }): CancelablePromise<string> {
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
  }): CancelablePromise<Position> {
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
  }): CancelablePromise<Position> {
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
