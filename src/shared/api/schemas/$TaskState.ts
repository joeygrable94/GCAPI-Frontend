/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TaskState = {
    properties: {
        task_id: {
            type: 'string',
            isRequired: true,
        },
        task_status: {
            type: 'all-of',
            contains: [{
                type: 'TaskStatus',
            }],
        },
        task_time: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        task_result: {
            type: 'any-of',
            contains: [{
                type: 'null',
            }],
        },
    },
} as const;
