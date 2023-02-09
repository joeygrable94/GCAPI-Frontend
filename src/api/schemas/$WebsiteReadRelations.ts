/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsiteReadRelations = {
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
    domain: {
      type: 'string',
      isRequired: true,
    },
    is_secure: {
      type: 'boolean',
    },
    clients: {
      type: 'array',
      contains: {
        type: 'ClientRead',
      },
    },
    sitemaps: {
      type: 'array',
      contains: {
        type: 'WebsiteMapRead',
      },
    },
    pages: {
      type: 'array',
      contains: {
        type: 'WebsitePageRead',
      },
    },
  },
} as const;
