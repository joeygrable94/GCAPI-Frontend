/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessTokenRead } from './AccessTokenRead';
import type { ClientRead } from './ClientRead';
import type { IpAddressRead } from './IpAddressRead';

export type UserAdminRelations = {
  principals: Array<string>;
  id: string;
  created_on: string;
  updated_on: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  ip_addresses?: Array<IpAddressRead>;
  tokens?: Array<AccessTokenRead>;
  clients?: Array<ClientRead>;
};

