/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ClientWebsiteRead = {
  properties: {
    id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
    created_on: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    updated_on: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    client_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
    website_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
  },
} as const;
