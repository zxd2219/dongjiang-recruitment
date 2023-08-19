/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query, Sort } from "../../interfaces";
import type { WorkExperience } from "../models/WorkExperience";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantWorkExperienceService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加工作经历
   * @returns any 成功
   * @throws ApiError
   */
  public addWorkExperience({
    applicantId,
    requestBody,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    requestBody?: {
      /**
       * 公司名称
       */
      companyName: string;
      /**
       * 公司领域
       */
      companyIndustry: string;
      /**
       * 就职时间
       */
      startTime: string;
      /**
       * 离职时间
       */
      endTime: string;
      /**
       * 职位类型，eg；{1:FullTime,2:PartTime,3:Practice}
       */
      positionType: 1 | 2 | 3;
      /**
       * 职位名称
       */
      positionName: string;
      /**
       * 部门名称
       */
      departmentName: string;
      /**
       * 工作内容
       */
      jobContent: string;
    };
  }): CancelablePromise<WorkExperience> {
    return this.httpRequest.request({
      method: "POST",
      url: "/applicant/{applicantId}/workExperiences",
      path: {
        applicantId: applicantId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询工作经历
   * @returns any 成功
   * @throws ApiError
   */
  public queryWorkExperience({
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
    query?: Query<WorkExperience>;
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
    sort?: Sort<WorkExperience>;
  }): CancelablePromise<{
    /**
     * 工作经历总数
     */
    total: number;
    /**
     * 当页工作经历
     */
    items: Array<WorkExperience>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/workExperiences",
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
   * 移除工作经历
   * @returns any 成功
   * @throws ApiError
   */
  public removeWorkExperience({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 工作经历ID
     */
    id: string;
  }): CancelablePromise<string> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/applicant/{applicantId}/workExperiences/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }

  /**
   * 修改工作经历
   * @returns any 成功
   * @throws ApiError
   */
  public updateWorkExperience({
    applicantId,
    id,
    requestBody,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 工作经历ID
     */
    id: string;
    requestBody?: WorkExperience;
  }): CancelablePromise<WorkExperience> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/applicant/{applicantId}/workExperiences/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 获取工作经历
   * @returns any 成功
   * @throws ApiError
   */
  public getWorkExperience({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 工作经历ID
     */
    id: string;
  }): CancelablePromise<WorkExperience> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/workExperiences/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }
}
