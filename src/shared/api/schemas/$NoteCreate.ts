/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $NoteCreate = {
    properties: {
        title: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        is_active: {
            type: 'boolean',
        },
        user_id: {
            type: 'string',
            isRequired: true,
            format: 'uuid4',
        },
    },
} as const;
