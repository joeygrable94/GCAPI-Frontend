/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Body_auth_reset_password_api_v1_auth_reset_password_post = {
  properties: {
    password: {
      type: 'string',
      isRequired: true
    },
    token: {
      type: 'string',
      isRequired: true
    },
    csrf: {
      type: 'string',
      isRequired: true
    }
  }
} as const;
