/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AccessTokenRead = {
  id: string;
  created_on: string;
  updated_on: string;
  token_jti: string;
  csrf: string;
  expires_at?: string;
  is_revoked: boolean;
  user_id: string;
};

