/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsiteCreateProcessing = {
  properties: {
    website: {
      type: 'WebsiteRead',
      isRequired: true,
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
