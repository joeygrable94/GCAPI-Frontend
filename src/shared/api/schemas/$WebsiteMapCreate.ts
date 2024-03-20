/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsiteMapCreate = {
  properties: {
    url: {
      type: 'string',
      isRequired: true,
    },
    is_active: {
      type: 'boolean',
    },
    website_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
  },
} as const;
