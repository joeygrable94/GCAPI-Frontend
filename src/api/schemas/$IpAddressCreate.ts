/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $IpAddressCreate = {
  properties: {
    address: {
      type: 'string',
      isRequired: true,
    },
    is_blocked: {
      type: 'boolean',
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
