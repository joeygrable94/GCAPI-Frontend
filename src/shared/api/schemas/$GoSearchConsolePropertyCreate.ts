/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GoSearchConsolePropertyCreate = {
    properties: {
        title: {
            type: 'string',
            isRequired: true,
        },
        client_id: {
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
