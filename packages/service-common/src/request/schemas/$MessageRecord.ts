/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $MessageRecord = {
  description: `消息记录`,
  properties: {
    id: {
      type: "string",
      description: `消息记录ID`,
      isRequired: true,
    },
    createdAt: {
      type: "string",
      description: `创建时间`,
      isRequired: true,
    },
    updatedAt: {
      type: "string",
      description: `更新时间`,
      isRequired: true,
    },
    initiateId: {
      type: "string",
      description: `发起用户ID`,
      isRequired: true,
    },
    initiateType: {
      type: "number",
      description: `发起用户类型`,
      isRequired: true,
    },
    serviceId: {
      type: "string",
      description: `接收用户ID`,
      isRequired: true,
    },
    serviceType: {
      type: "number",
      description: `接收用户类型`,
      isRequired: true,
    },
    messageType: {
      type: "Enum",
      isRequired: true,
    },
    content: {
      type: "string",
      description: `消息内容`,
      isRequired: true,
    },
  },
} as const;
