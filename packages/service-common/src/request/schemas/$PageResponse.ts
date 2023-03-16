/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PageResponse = {
  description: `分页响应`,
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
      description: `分页结果`,
      properties: {
        total: {
          type: "number",
          description: `数据总数`,
          isRequired: true,
        },
        items: {
          type: "array",
          contains: {
            type: "string",
          },
          isRequired: true,
        },
      },
      isRequired: true,
    },
  },
} as const;
