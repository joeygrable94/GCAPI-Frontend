/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GoAnalytics4StreamUpdate = {
    properties: {
        title: {
            type: 'any-of',
            contains: [{
                type: 'string',
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
    },
} as const;
