/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $JobExpectation = {
  description: `求职期望`,
  properties: {
    id: {
      type: "string",
      description: `求职期望ID`,
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
    positionType: {
      type: "Enum",
      isRequired: true,
    },
    directionTags: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    positionName: {
      type: "string",
      description: `职位名称`,
      isRequired: true,
    },
    startingSalary: {
      type: "number",
      description: `单位K`,
      isRequired: true,
    },
    ceilingSalary: {
      type: "number",
      description: `单位K`,
      isRequired: true,
    },
    cityName: {
      type: "string",
      description: `期望城市`,
      isRequired: true,
    },
  },
} as const;
