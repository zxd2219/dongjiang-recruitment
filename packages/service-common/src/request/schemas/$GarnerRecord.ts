/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GarnerRecord = {
  description: `收藏记录`,
  properties: {
    id: {
      type: "string",
      description: `收藏记录ID`,
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
    positionId: {
      type: "string",
      description: `职位ID`,
      isRequired: true,
    },
  },
} as const;
