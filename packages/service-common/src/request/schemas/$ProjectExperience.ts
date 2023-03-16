/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ProjectExperience = {
  description: `项目经历`,
  properties: {
    id: {
      type: "string",
      description: `项目经历ID`,
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
    projectName: {
      type: "string",
      description: `项目名称`,
      isRequired: true,
    },
    projectDescription: {
      type: "string",
      description: `项目描述`,
      isRequired: true,
    },
    achievement: {
      type: "string",
      description: `我的成就`,
      isRequired: true,
    },
    startTime: {
      type: "string",
      description: `开始时间`,
      isRequired: true,
      pattern:
        "^((((19|20)\\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\\d|30))|(((19|20)\\d{2})-(0?[13578]|1[02])-31)|(((19|20)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$",
    },
    endTime: {
      type: "string",
      description: `结束时间`,
      isRequired: true,
      pattern:
        "^((((19|20)\\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\\d|30))|(((19|20)\\d{2})-(0?[13578]|1[02])-31)|(((19|20)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$",
    },
    projectLink: {
      type: "string",
      description: `项目链接`,
      isRequired: true,
    },
  },
} as const;
