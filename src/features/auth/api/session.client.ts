import { AuthConfig, defaultAuthConfig } from '~/features/auth';
import { getClientCookie } from '~/features/cookie/session.client';
import { decryptData } from '~/features/encrypt';

export function useClientAuthCookie(name: string = 'gcapi_auth'): AuthConfig {
  let auth: AuthConfig;
  let cookie = getClientCookie(name);
  auth = cookie?.length ? decryptData<AuthConfig>(cookie) : defaultAuthConfig;
  return auth;
}
