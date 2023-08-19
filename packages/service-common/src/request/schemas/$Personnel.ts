/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Personnel = {
  description: `人事`,
  properties: {
    id: {
      type: "string",
      description: `人事ID`,
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
      isNullable: true,
    },
    company: {
      type: "Company",
      description: `公司`,
      isRequired: true,
    },
    avatarUrl: {
      type: "string",
      description: `头像地址`,
      isRequired: true,
    },
    hrName: {
      type: "string",
      description: `人事姓名`,
      isRequired: true,
    },
    postName: {
      type: "string",
      description: `职位名称`,
      isRequired: true,
    },
    acceptEmail: {
      type: "string",
      description: `电子邮箱`,
      isRequired: true,
    },
  },
} as const;
