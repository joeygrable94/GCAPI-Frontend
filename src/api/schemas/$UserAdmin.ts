/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserAdmin = {
  properties: {
    principals: {
      type: 'array',
      contains: {
        type: 'string',
      },
      isRequired: true,
    },
    email: {
      type: 'string',
      isRequired: true,
      format: 'email',
    },
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
    is_active: {
      type: 'boolean',
      isRequired: true,
    },
    is_superuser: {
      type: 'boolean',
      isRequired: true,
    },
    is_verified: {
      type: 'boolean',
      isRequired: true,
    },
  },
} as const;
