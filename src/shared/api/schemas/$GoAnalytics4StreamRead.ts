/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GoAnalytics4StreamRead = {
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
