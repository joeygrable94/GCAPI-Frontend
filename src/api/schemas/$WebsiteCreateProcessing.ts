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
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
  },
} as const;
