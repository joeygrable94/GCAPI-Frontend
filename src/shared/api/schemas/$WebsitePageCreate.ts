/* generated using openapi-typescript-codegen -- do not edit */
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
                type: 'string',
            }],
            isRequired: true,
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
            type: 'boolean',
        },
        website_id: {
            type: 'string',
            isRequired: true,
            format: 'uuid4',
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
