/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsiteMapCreate = {
  properties: {
    url: {
      type: 'string',
      isRequired: true,
    },
    website_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
  },
} as const;
