import { getRequestEvent, isServer } from 'solid-js/web';
import { getCookie } from 'vinxi/server';
import { getClientCookie } from '~/shared/utils';

export function useDarkModeCookie(name: string = 'darkMode'): boolean | undefined {
  let darkMode: string | undefined;
  if (isServer) {
    darkMode = getCookie(getRequestEvent()!, name);
  } else {
    darkMode = getClientCookie(name);
  }
  if (darkMode?.length) {
    return darkMode === 'true' ? true : false;
  }
}
