/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 职位类型
 */
export type PositionTypes = Array<{
  /**
   * 领域名
   */
  fieldName: string;
  /**
   * 方向
   */
  directions: Array<{
    /**
     * 方向名
     */
    directionName: string;
    /**
     * 职位
     */
    positions: Array<string>;
  }>;
}>;
