/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PositionTypes = {
  type: "array",
  contains: {
    properties: {
      fieldName: {
        type: "string",
        description: `领域名`,
        isRequired: true,
      },
      directions: {
        type: "array",
        contains: {
          properties: {
            directionName: {
              type: "string",
              description: `方向名`,
              isRequired: true,
            },
            positions: {
              type: "array",
              contains: {
                type: "string",
              },
              isRequired: true,
            },
          },
        },
        isRequired: true,
      },
    },
  },
} as const;
