/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Authority = {
  description: `权限`,
  properties: {
    id: {
      type: "string",
      description: `权限ID`,
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
  },
} as const;
