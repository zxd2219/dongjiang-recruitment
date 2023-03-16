/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { Areas } from "../models/Areas";
import type { Cities } from "../models/Cities";
import type { DirectionTags } from "../models/DirectionTags";
import type { FilterCriteria } from "../models/FilterCriteria";
import type { PositionTypes } from "../models/PositionTypes";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class CommonService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 获取地区
   * @returns any 成功
   * @throws ApiError
   */
  public getAreas({
    cityName,
  }: {
    /**
     * 城市名称
     */
    cityName: string;
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
     * 地区
     */
    body: Areas;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/common/areas",
      query: {
        cityName: cityName,
      },
    });
  }

  /**
   * 获取细分标签
   * @returns any 成功
   * @throws ApiError
   */
  public getDirectionTags({
    positionName,
  }: {
    /**
     * 职位名称
     */
    positionName: string;
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
     * 细分标签
     */
    body: DirectionTags;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/common/directionTags",
      query: {
        positionName: positionName,
      },
    });
  }

  /**
   * 获取筛选条件
   * @returns any 成功
   * @throws ApiError
   */
  public getFilterCriteria(): CancelablePromise<{
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
     * 筛选条件
     */
    body: FilterCriteria;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/common/filterCriteria",
    });
  }

  /**
   * 获取职位类型
   * @returns any 成功
   * @throws ApiError
   */
  public getPositionTypes(): CancelablePromise<{
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
     * 职位类型
     */
    body: PositionTypes;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/common/positionTypes",
    });
  }

  /**
   * 获取城市
   * @returns any 成功
   * @throws ApiError
   */
  public getCities(): CancelablePromise<{
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
     * 城市
     */
    body: Cities;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/common/cities",
    });
  }

  /**
   * 获取新版本
   * @returns any 成功
   * @throws ApiError
   */
  public getNewVersion(): CancelablePromise<{
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
     * 新版本号
     */
    body: number;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/common/newVersion",
    });
  }

  /**
   * 获取验证码
   * @returns any 成功
   * @throws ApiError
   */
  public sendVerificationCode({
    email,
  }: {
    /**
     * 电子邮箱
     */
    email: string;
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
     * 发送状态
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/common/verificationCode",
      query: {
        email: email,
      },
    });
  }

  /**
   * 上传文件
   * @returns any 成功
   * @throws ApiError
   */
  public uploadFile({
    formData,
  }: {
    formData?: {
      /**
       * 文件
       */
      file: Blob;
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
    /**
     * 文件地址
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/common/files",
      formData: formData,
      mediaType: "multipart/form-data",
    });
  }

  /**
   * 上传头像
   * @returns any 成功
   * @throws ApiError
   */
  public uploadAvatar({
    formData,
  }: {
    formData?: {
      /**
       * 头像
       */
      avatar: Blob;
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
    /**
     * 头像地址
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/common/avatars",
      formData: formData,
      mediaType: "multipart/form-data",
    });
  }
}
