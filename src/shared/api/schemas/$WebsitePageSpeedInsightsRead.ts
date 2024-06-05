/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsitePageSpeedInsightsRead = {
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
        strategy: {
            type: 'string',
            isRequired: true,
        },
        ps_weight: {
            type: 'number',
            isRequired: true,
        },
        ps_grade: {
            type: 'number',
            isRequired: true,
        },
        ps_value: {
            type: 'string',
            isRequired: true,
        },
        ps_unit: {
            type: 'string',
            isRequired: true,
        },
        fcp_weight: {
            type: 'number',
            isRequired: true,
        },
        fcp_grade: {
            type: 'number',
            isRequired: true,
        },
        fcp_value: {
            type: 'number',
            isRequired: true,
        },
        fcp_unit: {
            type: 'string',
            isRequired: true,
        },
        lcp_weight: {
            type: 'number',
            isRequired: true,
        },
        lcp_grade: {
            type: 'number',
            isRequired: true,
        },
        lcp_value: {
            type: 'number',
            isRequired: true,
        },
        lcp_unit: {
            type: 'string',
            isRequired: true,
        },
        cls_weight: {
            type: 'number',
            isRequired: true,
        },
        cls_grade: {
            type: 'number',
            isRequired: true,
        },
        cls_value: {
            type: 'number',
            isRequired: true,
        },
        cls_unit: {
            type: 'string',
            isRequired: true,
        },
        si_weight: {
            type: 'number',
            isRequired: true,
        },
        si_grade: {
            type: 'number',
            isRequired: true,
        },
        si_value: {
            type: 'number',
            isRequired: true,
        },
        si_unit: {
            type: 'string',
            isRequired: true,
        },
        tbt_weight: {
            type: 'number',
            isRequired: true,
        },
        tbt_grade: {
            type: 'number',
            isRequired: true,
        },
        tbt_value: {
            type: 'number',
            isRequired: true,
        },
        tbt_unit: {
            type: 'string',
            isRequired: true,
        },
        page_id: {
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
