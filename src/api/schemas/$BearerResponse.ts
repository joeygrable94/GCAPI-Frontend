/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BearerResponse = {
  properties: {
    token_type: {
      type: 'string'
    },
    access_token: {
      type: 'string'
    },
    access_token_csrf: {
      type: 'string'
    },
    refresh_token: {
      type: 'string'
    },
    refresh_token_csrf: {
      type: 'string'
    }
  }
} as const;
