/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ClientReadRelations = {
  properties: {
    id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
    created_on: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    updated_on: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    content: {
      type: 'string',
    },
    title: {
      type: 'string',
      isRequired: true,
    },
    websites: {
      type: 'array',
      contains: {
        type: 'WebsiteRead',
      },
    },
  },
} as const;
