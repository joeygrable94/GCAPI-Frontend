/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GoAnalytics4PropertyCreate = {
    properties: {
        title: {
            type: 'string',
            isRequired: true,
        },
        measurement_id: {
            type: 'string',
            isRequired: true,
        },
        property_id: {
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
