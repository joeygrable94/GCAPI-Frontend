import { getClientCookie } from '~/providers/cookie/session.client';
import { defaultAuthConfig } from './constants';
import { AuthConfig } from './types';

export function useClientAuthCookie(name: string = 'gcapi_auth'): AuthConfig {
  let auth: AuthConfig;
  let authcookie = getClientCookie(name);
  auth = authcookie?.length
    ? (JSON.parse(authcookie) as AuthConfig)
    : defaultAuthConfig;
  return auth;
}
