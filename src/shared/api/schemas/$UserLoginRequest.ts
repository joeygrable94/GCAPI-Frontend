/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserLoginRequest = {
    properties: {
        auth_request_token: {
            type: 'string',
            isRequired: true,
        },
        email: {
            type: 'string',
            isRequired: true,
        },
        password: {
            type: 'string',
            isRequired: true,
        },
        confirm_password: {
            type: 'string',
            isRequired: true,
        },
        auth_scope: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
