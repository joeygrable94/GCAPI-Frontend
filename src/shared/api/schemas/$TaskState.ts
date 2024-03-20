/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TaskState = {
  properties: {
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
      isRequired: true,
    },
    task_status: {
      type: 'any-of',
      contains: [{
        type: 'string',
      }],
      isRequired: true,
    },
    task_result: {
      properties: {
      },
    },
  },
} as const;
