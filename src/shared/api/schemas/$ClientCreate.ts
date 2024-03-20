/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ClientCreate = {
  properties: {
    title: {
      type: 'string',
      isRequired: true,
    },
    description: {
      type: 'any-of',
      contains: [{
        type: 'string',
      }, {
        type: 'null',
      }],
    },
    is_active: {
      type: 'boolean',
    },
  },
} as const;
