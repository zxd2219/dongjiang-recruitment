/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DirectionTags = {
  type: "array",
  contains: {
    properties: {
      classificationName: {
        type: "string",
        description: `分类名`,
        isRequired: true,
      },
      subdivisionLabels: {
        type: "array",
        contains: {
          type: "string",
        },
        isRequired: true,
      },
    },
  },
} as const;
