/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserClientCreate = {
  properties: {
    user_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
    client_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
  },
} as const;
