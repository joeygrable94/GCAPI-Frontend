/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Paginated_UserReadAsManager_ = {
    properties: {
        total: {
            type: 'number',
            isRequired: true,
        },
        page: {
            type: 'number',
            isRequired: true,
        },
        size: {
            type: 'number',
            isRequired: true,
        },
        results: {
            type: 'array',
            contains: {
                type: 'UserReadAsManager',
            },
            isRequired: true,
        },
    },
} as const;
