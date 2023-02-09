/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $IpAddressUpdate = {
  properties: {
    location: {
      type: 'string',
    },
    isp: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    is_blocked: {
      type: 'boolean',
    },
    geocoord_id: {
      type: 'string',
      format: 'uuid4',
    },
  },
} as const;
