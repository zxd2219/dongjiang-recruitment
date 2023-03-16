/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Company = {
  description: `公司`,
  properties: {
    id: {
      type: "string",
      description: `公司ID`,
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
    logoUrl: {
      type: "string",
      description: `LOGO地址`,
      isRequired: true,
    },
    companyName: {
      type: "string",
      description: `公司名称`,
      isRequired: true,
    },
    recruitmentPosition: {
      type: "number",
      description: `在招职位`,
      isRequired: true,
    },
    cityName: {
      type: "string",
      description: `所在城市`,
      isRequired: true,
    },
    financingStage: {
      type: "Enum",
      isRequired: true,
    },
    scale: {
      type: "Enum",
      isRequired: true,
    },
    comprehensionName: {
      type: "string",
      description: `领域名称`,
      isRequired: true,
    },
    address: {
      type: "string",
      description: `详细地址`,
      isRequired: true,
    },
    about: {
      type: "string",
      description: `扩展`,
      isRequired: true,
    },
    fullName: {
      type: "string",
      description: `公司全称`,
      isRequired: true,
    },
    legalRepresentative: {
      type: "string",
      description: `法定代表人`,
      isRequired: true,
    },
    registeredCapital: {
      type: "string",
      description: `注册资本`,
      isRequired: true,
    },
    organizationType: {
      type: "string",
      description: `机构类型`,
      isRequired: true,
    },
    establishmentTime: {
      type: "string",
      description: `成立时间`,
      isRequired: true,
      pattern:
        "^((((19|20)\\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\\d|30))|(((19|20)\\d{2})-(0?[13578]|1[02])-31)|(((19|20)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$",
    },
    benefits: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    location: {
      description: `公司地点`,
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
