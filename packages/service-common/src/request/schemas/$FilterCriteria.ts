/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FilterCriteria = {
  description: `筛选条件`,
  properties: {
    occupationalBreakdown: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    expectedSalary: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    workExperience: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    education: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    natureWork: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    companySize: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    financingStage: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    industryField: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
  },
} as const;
