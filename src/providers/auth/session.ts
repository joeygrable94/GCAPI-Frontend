import { getRequestEvent, isServer } from 'solid-js/web';
import { getClientCookie, parseCookieByName } from '~/shared/utils';
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
    let event = getRequestEvent();
    let cookie = parseCookieByName<AuthConfig>(
      event?.request.headers.get('cookie') || '',
      name
    );
    auth = cookie ? cookie : defaultAuthConfig;
  }
  return auth;
}
