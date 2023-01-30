/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ClientRead = {
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
  },
} as const;
