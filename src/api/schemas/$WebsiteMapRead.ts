/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsiteMapRead = {
  properties: {
    title: {
      type: 'string',
      isRequired: true,
    },
    website_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
    file_path: {
      type: 'string',
      isRequired: true,
    },
    file_name: {
      type: 'string',
      isRequired: true,
    },
    is_processed: {
      type: 'boolean',
    },
    id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
  },
} as const;
