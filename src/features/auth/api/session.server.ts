import { AuthConfig, defaultAuthConfig } from '~/features/auth';
import { getServerCookie } from '~/features/cookie/session.server';

export function useServerAuthCookie(name: string = 'gcapi_auth'): AuthConfig {
  let auth: AuthConfig;
  const cookie = getServerCookie(name);
  auth = cookie?.length ? JSON.parse(cookie) : defaultAuthConfig;
  return auth;
}
