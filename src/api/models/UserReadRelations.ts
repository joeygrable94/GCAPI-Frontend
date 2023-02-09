/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientRead } from './ClientRead';

export type UserReadRelations = {
  id: string;
  created_on: string;
  updated_on: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  clients?: Array<ClientRead>;
};

