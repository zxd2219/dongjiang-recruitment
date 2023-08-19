/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 消息记录
 */
export type MessageRecord = {
  /**
   * 消息记录ID
   */
  id: string;
  /**
   * 创建时间
   */
  createdAt: string;
  /**
   * 更新时间
   */
  updatedAt: string;
  /**
   * 发起用户ID
   */
  initiateId: string;
  /**
   * 发起用户类型
   */
  initiateType: number;
  /**
   * 接收用户ID
   */
  serviceId: string;
  /**
   * 接收用户类型
   */
  serviceType: number;
  /**
   * 消息类型，eg；{1:Text,2:Picture,3:Voice,4:File}
   */
  messageType: MessageRecord.messageType;
  /**
   * 消息内容
   */
  content: string;
};

export namespace MessageRecord {
  /**
   * 消息类型，eg；{1:Text,2:Picture,3:Voice,4:File}
   */
  export enum messageType {
    Text = 1,
    Picture = 2,
    Voice = 3,
    File = 4,
  }
}
