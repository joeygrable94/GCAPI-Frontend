/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserUpdate = {
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
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
