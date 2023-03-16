/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Areas = {
  type: "array",
  contains: {
    properties: {
      areas: {
        type: "array",
        contains: {
          type: "string",
        },
        isRequired: true,
      },
      countyName: {
        type: "string",
        description: `区县名`,
        isRequired: true,
      },
    },
  },
} as const;
