/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Applicant = {
  description: `求职者`,
  properties: {
    id: {
      type: "string",
      description: `求职者ID`,
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
    avatarUrl: {
      type: "string",
      description: `头像地址`,
      isRequired: true,
    },
    firstName: {
      type: "string",
      description: `姓`,
      isRequired: true,
    },
    lastName: {
      type: "string",
      description: `名`,
      isRequired: true,
    },
    dateOfBirth: {
      type: "string",
      description: `生日`,
      isRequired: true,
      pattern:
        "^((((19|20)\\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\\d|30))|(((19|20)\\d{2})-(0?[13578]|1[02])-31)|(((19|20)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$",
    },
    sex: {
      type: "string",
      description: `性别`,
      isRequired: true,
    },
    age: {
      type: "number",
      description: `年龄`,
      isRequired: true,
    },
    cityName: {
      type: "string",
      description: `所在城市`,
      isRequired: true,
    },
    email: {
      type: "string",
      description: `电子邮箱`,
      isRequired: true,
    },
    workingYears: {
      type: "Enum",
      isRequired: true,
    },
    education: {
      type: "Enum",
      isRequired: true,
    },
    personalAdvantage: {
      type: "string",
      description: `个人优势`,
      isRequired: true,
    },
    socialHomepage: {
      type: "string",
      description: `社交主页`,
      isRequired: true,
    },
    jobStatus: {
      type: "Enum",
      isRequired: true,
    },
    pictureWorks: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    privacySettings: {
      type: "Enum",
      isRequired: true,
    },
  },
} as const;
