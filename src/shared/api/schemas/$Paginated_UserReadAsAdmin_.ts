/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Paginated_UserReadAsAdmin_ = {
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
        type: 'UserReadAsAdmin',
      },
      isRequired: true,
    },
  },
} as const;