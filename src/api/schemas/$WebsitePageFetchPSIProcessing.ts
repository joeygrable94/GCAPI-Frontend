/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsitePageFetchPSIProcessing = {
  properties: {
    page: {
      type: 'WebsitePageRead',
      isRequired: true,
    },
    mobile_task_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
    desktop_task_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
  },
} as const;
