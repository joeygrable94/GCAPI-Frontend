/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Body_auth_access_api_v1_auth_access_post = {
  properties: {
    grant_type: {
      type: 'string',
      pattern: 'password'
    },
    username: {
      type: 'string',
      isRequired: true
    },
    password: {
      type: 'string',
      isRequired: true
    },
    scope: {
      type: 'string'
    },
    client_id: {
      type: 'string'
    },
    client_secret: {
      type: 'string'
    }
  }
} as const;
