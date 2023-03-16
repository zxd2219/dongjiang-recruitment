/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $EducationExperience = {
  description: `教育经历`,
  properties: {
    id: {
      type: "string",
      description: `教育经历ID`,
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
    schoolName: {
      type: "string",
      description: `学校名称`,
      isRequired: true,
    },
    education: {
      type: "Enum",
      isRequired: true,
    },
    majorName: {
      type: "string",
      description: `专业名称`,
      isRequired: true,
    },
    admissionTime: {
      type: "string",
      description: `入学时间`,
      isRequired: true,
      pattern:
        "^((((19|20)\\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\\d|30))|(((19|20)\\d{2})-(0?[13578]|1[02])-31)|(((19|20)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$",
    },
    graduationTime: {
      type: "string",
      description: `毕业时间`,
      isRequired: true,
      pattern:
        "^((((19|20)\\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\\d|30))|(((19|20)\\d{2})-(0?[13578]|1[02])-31)|(((19|20)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$",
    },
  },
} as const;
