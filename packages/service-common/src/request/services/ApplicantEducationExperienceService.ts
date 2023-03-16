/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { EducationExperience } from "../models/EducationExperience";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantEducationExperienceService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加教育经历
   * @returns any 成功
   * @throws ApiError
   */
  public addEducationExperience({
    applicantId,
    requestBody,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    requestBody?: {
      /**
       * 学校名称
       */
      schoolName: string;
      /**
       * {1:大专,2:本科,3:硕士,4:博士}
       */
      education: 1 | 2 | 3 | 4;
      /**
       * 专业名称
       */
      majorName: string;
      /**
       * 入学时间
       */
      admissionTime: string;
      /**
       * 毕业时间
       */
      graduationTime: string;
    };
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
    body: EducationExperience;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/applicant/{applicantId}/eduExperiences",
      path: {
        applicantId: applicantId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询教育经历
   * @returns any 成功
   * @throws ApiError
   */
  public queryEducationExperience({
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
    query?: Query<EducationExperience>;
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
    sort?: Array<`${keyof EducationExperience},${"asc" | "desc"}`>;
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
       * 教育经历总数
       */
      total: number;
      /**
       * 当页教育经历
       */
      items: Array<EducationExperience>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/eduExperiences",
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
   * 移除教育经历
   * @returns any 成功
   * @throws ApiError
   */
  public removeEducationExperience({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 教育经历ID
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
     * 教育经历ID
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/applicant/{applicantId}/eduExperiences/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }

  /**
   * 修改教育经历
   * @returns any 成功
   * @throws ApiError
   */
  public updateEducationExperience({
    applicantId,
    id,
    requestBody,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 教育经历ID
     */
    id: string;
    requestBody?: EducationExperience;
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
    body: EducationExperience;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/applicant/{applicantId}/eduExperiences/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 获取教育经历
   * @returns any 成功
   * @throws ApiError
   */
  public getEducationExperience({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 教育经历ID
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
    body: EducationExperience;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/eduExperiences/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }
}
