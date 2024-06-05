/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsiteRead = {
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
        domain: {
            type: 'string',
            isRequired: true,
        },
        is_secure: {
            type: 'boolean',
        },
        is_active: {
            type: 'boolean',
        },
    },
} as const;
