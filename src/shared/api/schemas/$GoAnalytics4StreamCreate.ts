/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GoAnalytics4StreamCreate = {
    properties: {
        title: {
            type: 'string',
            isRequired: true,
        },
        stream_id: {
            type: 'string',
            isRequired: true,
        },
        ga4_id: {
            type: 'string',
            isRequired: true,
            format: 'uuid4',
        },
        website_id: {
            type: 'string',
            isRequired: true,
            format: 'uuid4',
        },
    },
} as const;
