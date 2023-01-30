/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RequestUserCreate = {
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
  },
} as const;
