/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsiteMapReadRelations = {
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
    url: {
      type: 'string',
      isRequired: true,
    },
    website_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
    pages: {
      type: 'array',
      contains: {
        type: 'WebsitePageRead',
      },
    },
  },
} as const;
