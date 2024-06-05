/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SharpspringRead = {
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
        api_key: {
            type: 'string',
            isRequired: true,
        },
        secret_key: {
            type: 'string',
            isRequired: true,
        },
        client_id: {
            type: 'string',
            isRequired: true,
            format: 'uuid4',
        },
    },
} as const;
