/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ApplicantInspectionRecord = {
  description: `求职者查看记录`,
  properties: {
    id: {
      type: "string",
      description: `求职者查看记录ID`,
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
    applicant: {
      type: "Applicant",
      description: `求职者`,
      isRequired: true,
    },
    company: {
      type: "Company",
      description: `公司`,
      isRequired: true,
    },
    position: {
      type: "Position",
      description: `职位`,
      isRequired: true,
    },
  },
} as const;
