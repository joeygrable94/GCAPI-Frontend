/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsitePagePSIProcessing = {
  properties: {
    page: {
      type: 'WebsitePageRead',
      isRequired: true,
    },
    psi_mobile_task_id: {
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
    psi_desktop_task_id: {
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
  },
} as const;
