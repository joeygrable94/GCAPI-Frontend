/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SharpspringUpdate = {
    properties: {
        api_key: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        secret_key: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        client_id: {
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
