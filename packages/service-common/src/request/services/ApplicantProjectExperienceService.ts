/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query, Sort } from "../../interfaces";
import type { ProjectExperience } from "../models/ProjectExperience";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantProjectExperienceService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加项目经历
   * @returns any 成功
   * @throws ApiError
   */
  public addProjectExperience({
    applicantId,
    requestBody,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    requestBody?: {
      /**
       * 项目名称
       */
      projectName: string;
      /**
       * 项目描述
       */
      projectDescription: string;
      /**
       * 我的成就
       */
      achievement: string;
      /**
       * 开始时间
       */
      startTime: string;
      /**
       * 结束时间
       */
      endTime: string;
      /**
       * 项目链接
       */
      projectLink: string;
    };
  }): CancelablePromise<ProjectExperience> {
    return this.httpRequest.request({
      method: "POST",
      url: "/applicant/{applicantId}/projectExperiences",
      path: {
        applicantId: applicantId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询项目经历
   * 查询项目经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public queryProjectExperience({
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
    query?: Query<ProjectExperience>;
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
    sort?: Sort<ProjectExperience>;
  }): CancelablePromise<{
    /**
     * 项目经历总数
     */
    total: number;
    /**
     * 当页项目经历
     */
    items: Array<ProjectExperience>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/projectExperiences",
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
   * 修改项目经历
   * @returns any 成功
   * @throws ApiError
   */
  public updateProjectExperience({
    applicantId,
    id,
    requestBody,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 项目经历ID
     */
    id: string;
    requestBody?: ProjectExperience;
  }): CancelablePromise<ProjectExperience> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/applicant/{applicantId}/projectExperiences/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 移除项目经历
   * @returns any 成功
   * @throws ApiError
   */
  public removeProjectExperience({
    applicantId,
    id,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 项目经历ID
     */
    id: string;
  }): CancelablePromise<string> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/applicant/{applicantId}/projectExperiences/{id}",
      path: {
        applicantId: applicantId,
        id: id,
      },
    });
  }

  /**
   * 获取项目经历
   * 获取项目经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getProjectExperience({
    applicantId,
    projectExperienceId,
  }: {
    /**
     * 求职者ID
     */
    applicantId: string;
    /**
     * 项目经历ID
     */
    projectExperienceId: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp?: string;
    /**
     * 响应状态
     */
    status?: number;
    /**
     * 状态描述
     */
    message?: string;
    body?: ProjectExperience;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/applicant/{applicantId}/projectExperiences/{projectExperienceId}",
      path: {
        applicantId: applicantId,
        projectExperienceId: projectExperienceId,
      },
    });
  }
}
