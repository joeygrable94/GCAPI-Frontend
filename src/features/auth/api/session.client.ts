import { AuthConfig, defaultAuthConfig } from '~/features/auth';
import { getClientCookie } from '~/features/cookie/session.client';

export function useClientAuthCookie(name: string = 'gcapi_auth'): AuthConfig {
  let auth: AuthConfig;
  let authcookie = getClientCookie(name);
  auth = authcookie?.length
    ? (JSON.parse(authcookie) as AuthConfig)
    : defaultAuthConfig;
  return auth;
}
