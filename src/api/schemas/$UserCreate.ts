/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserCreate = {
  properties: {
    email: {
      type: 'string',
      isRequired: true,
      format: 'email',
    },
    password: {
      type: 'string',
      isRequired: true,
    },
    is_active: {
      type: 'boolean',
    },
    is_superuser: {
      type: 'boolean',
    },
    is_verified: {
      type: 'boolean',
    },
  },
} as const;