/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Paginated_WebsitePageRead_ = {
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
        type: 'WebsitePageRead',
      },
      isRequired: true,
    },
  },
} as const;
