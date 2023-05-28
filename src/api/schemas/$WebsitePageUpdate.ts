/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsitePageUpdate = {
  properties: {
    url: {
      type: 'string',
    },
    status: {
      type: 'number',
    },
    priority: {
      type: 'any-of',
      contains: [{
        type: 'number',
      }, {
        type: 'number',
      }],
    },
    last_modified: {
      type: 'string',
      format: 'date-time',
    },
    change_frequency: {
      type: 'SitemapPageChangeFrequency',
    },
    sitemap_id: {
      type: 'string',
      format: 'uuid4',
    },
  },
} as const;
