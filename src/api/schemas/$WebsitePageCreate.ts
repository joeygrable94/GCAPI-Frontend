/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsitePageCreate = {
  properties: {
    url: {
      type: 'string',
      isRequired: true,
    },
    status: {
      type: 'number',
      isRequired: true,
    },
    priority: {
      type: 'any-of',
      contains: [{
        type: 'number',
      }, {
        type: 'number',
      }],
      isRequired: true,
    },
    last_modified: {
      type: 'string',
      format: 'date-time',
    },
    change_frequency: {
      type: 'SitemapPageChangeFrequency',
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
