/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Areas } from "../models/Areas";
import type { Cities } from "../models/Cities";
import type { DirectionTags } from "../models/DirectionTags";
import type { FilterCriteria } from "../models/FilterCriteria";
import type { PositionTypes } from "../models/PositionTypes";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

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
  }): CancelablePromise<Areas> {
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
  }): CancelablePromise<DirectionTags> {
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
  public getFilterCriteria(): CancelablePromise<FilterCriteria> {
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
  public getPositionTypes(): CancelablePromise<PositionTypes> {
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
  public getCities(): CancelablePromise<Cities> {
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
  public getNewVersion(): CancelablePromise<number> {
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
  }): CancelablePromise<string> {
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
  public uploadFile({ file }: { file: File }): CancelablePromise<string> {
    return this.httpRequest.request(
      "uni" in globalThis
        ? {
            method: "UPLOAD",
            url: "/common/files",
            body: file,
          }
        : {
            method: "POST",
            url: "/common/files",
            formData: {
              file,
            },
            mediaType: "multipart/form-data",
          }
    );
  }

  /**
   * 上传头像
   * @returns any 成功
   * @throws ApiError
   */
  public uploadAvatar({ avatar }: { avatar: File }): CancelablePromise<string> {
    return this.httpRequest.request(
      "uni" in globalThis
        ? {
            method: "UPLOAD",
            url: "/common/avatars",
            body: avatar,
          }
        : {
            method: "POST",
            url: "/common/avatars",
            formData: {
              avatar,
            },
            mediaType: "multipart/form-data",
          }
    );
  }

  /**
   * 查询订单状态
   * @returns any 成功
   * @throws ApiError
   */
  public getPaymentStatus({
    outTradeNo,
  }: {
    /**
     * 订单账号
     */
    outTradeNo: string;
  }): CancelablePromise<{
    code: string;
    msg: string;
    buyerLogonId: string;
    buyerPayAmount: string;
    buyerUserId: string;
    buyerUserType: string;
    invoiceAmount: string;
    outTradeNo: string;
    pointAmount: string;
    receiptAmount: string;
    totalAmount: string;
    tradeNo: string;
    tradeStatus: string;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/common/payment",
      query: {
        outTradeNo: outTradeNo,
      },
    });
  }

  /**
   * 创建订单
   * @returns any 成功
   * @throws ApiError
   */
  public addPayment({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 付款内容
       */
      name: string;
      /**
       * 付款金额
       */
      total: number;
    };
  }): CancelablePromise<{
    /**
     * 订单号
     */
    outTradeNo: string;
    /**
     * 支付地址
     */
    payUrl: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/common/payment",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
