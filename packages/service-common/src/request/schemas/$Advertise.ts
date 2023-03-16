/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Advertise = {
  description: `广告`,
  properties: {
    id: {
      type: "string",
      description: `广告ID`,
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
    banner: {
      type: "string",
      description: `图片地址`,
      isRequired: true,
    },
    position: {
      type: "Enum",
      isRequired: true,
    },
    status: {
      type: "Enum",
      isRequired: true,
    },
    payed: {
      type: "Enum",
      isRequired: true,
    },
    startTime: {
      type: "string",
      description: `开始时间`,
      isRequired: true,
    },
    endTime: {
      type: "string",
      description: `结束时间`,
      isRequired: true,
    },
  },
} as const;
