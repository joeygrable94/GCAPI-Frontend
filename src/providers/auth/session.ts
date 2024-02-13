import { getRequestEvent, isServer } from 'solid-js/web';
import { parseCookies } from 'vinxi/server';
import { getClientCookie } from '~/shared/utils';
import { defaultAuthConfig } from './constants';
import { AuthConfig } from './types';

export function useAuthCookie(name: string = 'gcapi_auth'): AuthConfig {
  let auth: AuthConfig = defaultAuthConfig;
  if (!isServer) {
    let authcookie = getClientCookie(name);
    if (authcookie?.length) {
      auth = JSON.parse(authcookie) as AuthConfig;
    }
  } else {
    const event = getRequestEvent();
    const cookies = parseCookies(event!);
    auth = cookies[name] ? JSON.parse(cookies[name]) : defaultAuthConfig;
  }
  return auth;
}
