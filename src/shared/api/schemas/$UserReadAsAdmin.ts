/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserReadAsAdmin = {
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
    auth_id: {
      type: 'string',
      isRequired: true,
    },
    email: {
      type: 'string',
      isRequired: true,
    },
    username: {
      type: 'string',
      isRequired: true,
    },
    picture: {
      type: 'string',
      isRequired: true,
    },
    is_active: {
      type: 'boolean',
      isRequired: true,
    },
    is_verified: {
      type: 'boolean',
      isRequired: true,
    },
    is_superuser: {
      type: 'boolean',
      isRequired: true,
    },
    scopes: {
      type: 'array',
      contains: {
        type: 'string',
      },
      isRequired: true,
    },
  },
} as const;
