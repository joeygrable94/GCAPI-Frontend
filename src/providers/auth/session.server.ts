import { getServerCookie } from '~/providers/cookie/session.server';
import { defaultAuthConfig } from './constants';
import { AuthConfig } from './types';

export function useServerAuthCookie(name: string = 'gcapi_auth'): AuthConfig {
  let auth: AuthConfig;
  const cookie = getServerCookie(name);
  auth = cookie?.length ? JSON.parse(cookie) : defaultAuthConfig;
  return auth;
}
