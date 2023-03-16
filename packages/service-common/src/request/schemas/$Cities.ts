/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Cities = {
  type: "array",
  contains: {
    properties: {
      provinceName: {
        type: "string",
        description: `省名`,
        isRequired: true,
      },
      cities: {
        type: "array",
        contains: {
          type: "string",
        },
        isRequired: true,
      },
    },
  },
} as const;
