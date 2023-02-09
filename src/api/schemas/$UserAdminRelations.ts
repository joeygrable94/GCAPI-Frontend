/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserAdminRelations = {
  properties: {
    principals: {
      type: 'array',
      contains: {
        type: 'string',
      },
      isRequired: true,
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
    email: {
      type: 'string',
      isRequired: true,
      format: 'email',
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
    ip_addresses: {
      type: 'array',
      contains: {
        type: 'IpAddressRead',
      },
    },
    tokens: {
      type: 'array',
      contains: {
        type: 'AccessTokenRead',
      },
    },
    clients: {
      type: 'array',
      contains: {
        type: 'ClientRead',
      },
    },
  },
} as const;
