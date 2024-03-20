/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserRead = {
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
  },
} as const;
