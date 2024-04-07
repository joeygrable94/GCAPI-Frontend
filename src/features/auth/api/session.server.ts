import { AuthConfig, defaultAuthConfig } from '~/features/auth';
import { getServerCookie } from '~/features/cookie/session.server';
import { decryptData } from '~/features/encrypt';

export function useServerAuthCookie(name: string = 'gcapi_auth'): AuthConfig {
  let auth: AuthConfig;
  const cookie = getServerCookie(name);
  auth = cookie?.length ? decryptData<AuthConfig>(cookie) : defaultAuthConfig;
  return auth;
}
