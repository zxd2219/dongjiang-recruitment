/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DeliveryRecord = {
  description: `投递记录`,
  properties: {
    id: {
      type: "string",
      description: `投递记录ID`,
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
    applicantId: {
      type: "string",
      description: `求职者ID`,
      isRequired: true,
    },
    status: {
      type: "Enum",
      isRequired: true,
    },
    interviewTime: {
      type: "string",
      description: `面试时间`,
      isRequired: true,
      pattern:
        "^((((19|20)\\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\\d|30))|(((19|20)\\d{2})-(0?[13578]|1[02])-31)|(((19|20)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$",
    },
    companyId: {
      type: "string",
      description: `公司ID`,
      isRequired: true,
    },
    positionId: {
      type: "string",
      description: `职位ID`,
      isRequired: true,
    },
  },
} as const;
