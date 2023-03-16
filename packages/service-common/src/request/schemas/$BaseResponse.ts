/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BaseResponse = {
  description: `基础响应`,
  properties: {
    timestamp: {
      type: "string",
      description: `响应时间`,
      isRequired: true,
    },
    message: {
      type: "string",
      description: `响应`,
      isRequired: true,
    },
    status: {
      type: "number",
      description: `响应编码`,
      isRequired: true,
    },
    body: {
      description: `响应体`,
      properties: {},
      isRequired: true,
    },
  },
} as const;
