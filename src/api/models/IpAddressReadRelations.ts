/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserRead } from './UserRead';

export type IpAddressReadRelations = {
  id: string;
  created_on: string;
  updated_on: string;
  address: string;
  is_blocked: boolean;
  isp?: string;
  location?: string;
  geocoord_id?: string;
  users?: Array<UserRead>;
};

