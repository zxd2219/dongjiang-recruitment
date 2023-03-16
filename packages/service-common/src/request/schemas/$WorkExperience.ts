/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WorkExperience = {
  description: `工作经历`,
  properties: {
    id: {
      type: "string",
      description: `工作经历ID`,
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
    companyName: {
      type: "string",
      description: `公司名称`,
      isRequired: true,
    },
    companyIndustry: {
      type: "string",
      description: `公司领域`,
      isRequired: true,
    },
    startTime: {
      type: "string",
      description: `就职时间`,
      isRequired: true,
      pattern:
        "^((((19|20)\\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\\d|30))|(((19|20)\\d{2})-(0?[13578]|1[02])-31)|(((19|20)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$",
    },
    endTime: {
      type: "string",
      description: `离职时间`,
      isRequired: true,
      pattern:
        "^((((19|20)\\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\\d|30))|(((19|20)\\d{2})-(0?[13578]|1[02])-31)|(((19|20)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$",
    },
    positionType: {
      type: "Enum",
      isRequired: true,
    },
    positionName: {
      type: "string",
      description: `职位名称`,
      isRequired: true,
    },
    departmentName: {
      type: "string",
      description: `部门名称`,
      isRequired: true,
    },
    jobContent: {
      type: "string",
      description: `工作内容`,
      isRequired: true,
    },
  },
} as const;
