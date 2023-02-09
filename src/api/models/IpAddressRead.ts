/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type IpAddressRead = {
  id: string;
  created_on: string;
  updated_on: string;
  address: string;
  is_blocked: boolean;
  isp?: string;
  location?: string;
  geocoord_id?: string;
};

