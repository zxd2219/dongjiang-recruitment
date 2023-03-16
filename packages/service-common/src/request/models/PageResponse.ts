/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 分页响应
 */
export type PageResponse = {
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
     * 数据总数
     */
    total: number;
    /**
     * 当页数据
     */
    items: Array<string>;
  };
};
