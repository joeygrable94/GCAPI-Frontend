/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsitePageRead = {
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
    path: {
      type: 'string',
      isRequired: true,
    },
    status: {
      type: 'number',
      isRequired: true,
    },
    website_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
    sitemap_id: {
      type: 'string',
      format: 'uuid4',
    },
  },
} as const;
