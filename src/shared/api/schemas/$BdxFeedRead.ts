/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BdxFeedRead = {
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
        username: {
            type: 'string',
            isRequired: true,
        },
        password: {
            type: 'string',
            isRequired: true,
        },
        serverhost: {
            type: 'string',
            isRequired: true,
        },
        xml_file_key: {
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
