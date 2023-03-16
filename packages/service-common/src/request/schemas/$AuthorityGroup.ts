/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AuthorityGroup = {
  description: `权限组`,
  properties: {
    id: {
      type: "string",
      description: `权限组ID`,
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
    authorities: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
  },
} as const;
