/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TaskState = {
  properties: {
    task_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
    task_status: {
      type: 'string',
      isRequired: true,
    },
    task_result: {
      properties: {
      },
    },
  },
} as const;
