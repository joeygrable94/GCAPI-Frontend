/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GoSearchConsoleMetricCreate = {
    properties: {
        title: {
            type: 'string',
            isRequired: true,
        },
        keys: {
            type: 'string',
            isRequired: true,
        },
        clicks: {
            type: 'number',
            isRequired: true,
        },
        impressions: {
            type: 'number',
            isRequired: true,
        },
        ctr: {
            type: 'number',
            isRequired: true,
        },
        position: {
            type: 'number',
            isRequired: true,
        },
        date_start: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        date_end: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        gsc_id: {
            type: 'string',
            isRequired: true,
            format: 'uuid4',
        },
    },
} as const;
