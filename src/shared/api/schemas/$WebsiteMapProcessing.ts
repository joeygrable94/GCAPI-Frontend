/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsiteMapProcessing = {
    properties: {
        url: {
            type: 'string',
            isRequired: true,
        },
        website_id: {
            type: 'string',
            isRequired: true,
            format: 'uuid4',
        },
        sitemap_id: {
            type: 'string',
            isRequired: true,
            format: 'uuid4',
        },
        task_id: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
    },
} as const;
