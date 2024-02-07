import { getRequestEvent, isServer } from 'solid-js/web';
import { getCookie } from 'vinxi/server';
import { getClientCookie } from '~/shared/utils';
import { defaultAuthConfig } from './constants';
import { AuthConfig } from './types';

export function useAuthCookie(name: string = 'gcapi_auth') {
  let token: string | undefined;
  if (isServer) {
    token = getCookie(getRequestEvent()!, name);
  } else {
    token = getClientCookie(name);
  }
  if (token?.length) {
    return JSON.parse(token) as AuthConfig;
  }
  return defaultAuthConfig;
}
