import { getRequestEvent, isServer } from 'solid-js/web';
import { parseCookies } from 'vinxi/server';
import { getClientCookie } from '~/shared/utils';

export function useDarkModeCookie(name: string = 'darkMode'): boolean {
  let darkMode: boolean = false;
  if (!isServer) {
    let dmcc = getClientCookie(name);
    if (dmcc?.length) {
      darkMode = dmcc === 'true' ? true : false;
    }
  } else {
    const event = getRequestEvent();
    const cookies = parseCookies(event!);
    darkMode = cookies[name] ? JSON.parse(cookies[name]) : darkMode;
  }
  return darkMode;
}
