/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Advertiser = {
  description: `广告商`,
  properties: {
    id: {
      type: "string",
      description: `广告商ID`,
      isRequired: true,
    },
    createdAt: {
      type: "string",
      description: `创建时间`,
      isRequired: true,
    },
    updatedAt: {
      type: "string",
      description: `修改时间`,
      isRequired: true,
    },
    deletedAt: {
      type: "string",
      description: `移除时间`,
      isRequired: true,
    },
    name: {
      type: "string",
      description: `名称`,
      isRequired: true,
    },
    pageUrl: {
      type: "string",
      description: `网页地址`,
      isRequired: true,
    },
    logoUrl: {
      type: "string",
      description: `Logo地址`,
      isRequired: true,
    },
  },
} as const;
