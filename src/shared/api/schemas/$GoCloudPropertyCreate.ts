/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GoCloudPropertyCreate = {
    properties: {
        project_name: {
            type: 'string',
            isRequired: true,
        },
        project_id: {
            type: 'string',
            isRequired: true,
        },
        project_number: {
            type: 'string',
            isRequired: true,
        },
        service_account: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        client_id: {
            type: 'string',
            isRequired: true,
            format: 'uuid4',
        },
    },
} as const;
