/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 基础响应
 */
export type BaseResponse = {
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
   * 响应体
   */
  body: any;
};
