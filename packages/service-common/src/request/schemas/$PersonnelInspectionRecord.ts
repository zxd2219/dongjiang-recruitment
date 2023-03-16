/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PersonnelInspectionRecord = {
  description: `人事查看记录`,
  properties: {
    id: {
      type: "string",
      description: `人事查看记录ID`,
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
    personnelId: {
      type: "string",
      description: `人事ID`,
      isRequired: true,
    },
    applicantId: {
      type: "string",
      description: `求职者ID`,
      isRequired: true,
    },
  },
} as const;
