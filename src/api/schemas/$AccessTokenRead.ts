/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AccessTokenRead = {
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
    token_jti: {
      type: 'string',
      isRequired: true,
    },
    csrf: {
      type: 'string',
      isRequired: true,
    },
    expires_at: {
      type: 'string',
      format: 'date-time',
    },
    is_revoked: {
      type: 'boolean',
      isRequired: true,
    },
    user_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
  },
} as const;
