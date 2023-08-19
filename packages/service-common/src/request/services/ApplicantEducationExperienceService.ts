/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query, Sort } from "../../interfaces";
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
       * 学历层次，eg；{1:JuniorCollege,2:Undergraduate,3:Postgraduate,4:Doctor}
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
  }): CancelablePromise<EducationExperience> {
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
    sort?: Sort<EducationExperience>;
  }): CancelablePromise<{
    /**
     * 教育经历总数
     */
    total: number;
    /**
     * 当页教育经历
     */
    items: Array<EducationExperience>;
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
  }): CancelablePromise<string> {
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
  }): CancelablePromise<EducationExperience> {
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
  }): CancelablePromise<EducationExperience> {
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
