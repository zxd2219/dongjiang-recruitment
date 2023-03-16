/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Account = {
  description: `账号`,
  properties: {
    id: {
      type: "string",
      description: `账号ID`,
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
    userName: {
      type: "string",
      description: `用户名`,
      isRequired: true,
    },
    detailId: {
      description: `详情ID`,
      properties: {
        manager: {
          type: "string",
          description: `管理员`,
          isRequired: true,
        },
        applicant: {
          type: "string",
          description: `求职者`,
          isRequired: true,
        },
        personnel: {
          type: "string",
          description: `人事`,
          isRequired: true,
        },
        advertiser: {
          type: "string",
          description: `广告商`,
          isRequired: true,
        },
      },
      isRequired: true,
    },
    authorities: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    groups: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
  },
} as const;
