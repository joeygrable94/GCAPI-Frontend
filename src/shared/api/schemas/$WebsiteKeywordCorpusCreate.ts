/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsiteKeywordCorpusCreate = {
    properties: {
        corpus: {
            type: 'string',
            isRequired: true,
        },
        rawtext: {
            type: 'string',
            isRequired: true,
        },
        website_id: {
            type: 'string',
            isRequired: true,
            format: 'uuid4',
        },
        page_id: {
            type: 'string',
            isRequired: true,
            format: 'uuid4',
        },
    },
} as const;
