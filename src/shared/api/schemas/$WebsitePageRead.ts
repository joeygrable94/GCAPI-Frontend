/* generated using openapi-typescript-codegen -- do not edit */
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
        created: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        updated: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
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
            isRequired: true,
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
