/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AttentionRecord = {
  description: `关注记录`,
  properties: {
    id: {
      type: "string",
      description: `关注记录ID`,
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
    deletedAt: {
      type: "string",
      description: `移除时间`,
      isRequired: true,
    },
    applicantId: {
      type: "string",
      description: `求职者ID`,
      isRequired: true,
    },
    companyId: {
      type: "string",
      description: `公司ID`,
      isRequired: true,
    },
  },
} as const;
