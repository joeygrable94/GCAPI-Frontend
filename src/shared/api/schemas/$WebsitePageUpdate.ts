/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsitePageUpdate = {
  properties: {
    url: {
      type: 'any-of',
      contains: [{
        type: 'string',
      }, {
        type: 'null',
      }],
    },
    status: {
      type: 'any-of',
      contains: [{
        type: 'number',
      }, {
        type: 'null',
      }],
    },
    priority: {
      type: 'any-of',
      contains: [{
        type: 'number',
      }, {
        type: 'string',
      }, {
        type: 'null',
      }],
    },
    last_modified: {
      type: 'any-of',
      contains: [{
        type: 'string',
        format: 'date-time',
      }, {
        type: 'null',
      }],
    },
    change_frequency: {
      type: 'any-of',
      contains: [{
        type: 'SitemapPageChangeFrequency',
      }, {
        type: 'null',
      }],
    },
    is_active: {
      type: 'any-of',
      contains: [{
        type: 'boolean',
      }, {
        type: 'null',
      }],
    },
    website_id: {
      type: 'any-of',
      contains: [{
        type: 'string',
        format: 'uuid4',
      }, {
        type: 'null',
      }],
    },
    sitemap_id: {
      type: 'any-of',
      contains: [{
        type: 'string',
        format: 'uuid4',
      }, {
        type: 'null',
      }],
    },
  },
} as const;
