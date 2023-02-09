/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $IpAddressRead = {
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
    address: {
      type: 'string',
      isRequired: true,
    },
    is_blocked: {
      type: 'boolean',
      isRequired: true,
    },
    isp: {
      type: 'string',
    },
    location: {
      type: 'string',
    },
    geocoord_id: {
      type: 'string',
      format: 'uuid4',
    },
  },
} as const;
