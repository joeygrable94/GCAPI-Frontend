/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserUpdateAuthPermissions = {
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
  },
} as const;
