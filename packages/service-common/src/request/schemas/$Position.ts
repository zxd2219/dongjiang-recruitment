/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Position = {
  description: `职位`,
  properties: {
    id: {
      type: "string",
      description: `职位ID`,
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
    positionName: {
      type: "string",
      description: `职位名称`,
      isRequired: true,
    },
    positionType: {
      type: "string",
      description: `职位类型`,
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
    directionTags: {
      type: "array",
      contains: {
        type: "string",
      },
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
    workProvinceName: {
      type: "string",
      description: `工作省份`,
      isRequired: true,
    },
    workCityName: {
      type: "string",
      description: `工作城市`,
      isRequired: true,
    },
    workAreaName: {
      type: "string",
      description: `工作地区`,
      isRequired: true,
    },
    companyId: {
      type: "string",
      description: `公司ID`,
      isRequired: true,
    },
    personnelId: {
      type: "string",
      description: `人事ID`,
      isRequired: true,
    },
    workType: {
      type: "Enum",
      isRequired: true,
    },
    departmentName: {
      type: "string",
      description: `所属部门`,
      isRequired: true,
    },
    highlights: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    description: {
      type: "string",
      description: `职位描述`,
      isRequired: true,
    },
    weekendReleaseTime: {
      type: "Enum",
      isRequired: true,
    },
    workTime: {
      type: "string",
      description: `上班时间`,
      isRequired: true,
    },
    overTime: {
      type: "string",
      description: `下班时间`,
      isRequired: true,
    },
    interviewInfo: {
      description: `面试`,
      properties: {
        situation: {
          type: "Enum",
          isRequired: true,
        },
        wheel: {
          type: "Enum",
          isRequired: true,
        },
        time: {
          type: "Enum",
          isRequired: true,
        },
        illustrate: {
          type: "Enum",
          isRequired: true,
        },
      },
      isRequired: true,
    },
    workingPlace: {
      description: `上班地点`,
      properties: {
        longitude: {
          type: "number",
          description: `经度`,
          isRequired: true,
        },
        latitude: {
          type: "number",
          description: `纬度`,
          isRequired: true,
        },
      },
      isRequired: true,
    },
  },
} as const;
