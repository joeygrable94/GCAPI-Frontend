/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ClientDelete = {
  properties: {
    message: {
      type: 'string',
      isRequired: true,
    },
    user_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
    client_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
    task_id: {
      type: 'any-of',
      contains: [{
        type: 'string',
        format: 'uuid4',
      }, {
        type: 'string',
      }, {
        type: 'null',
      }],
    },
  },
} as const;
