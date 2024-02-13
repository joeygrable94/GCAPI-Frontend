import { getRequestEvent, isServer } from 'solid-js/web';
import { getClientCookie, parseCookieByName } from '~/shared/utils';

export function useDarkModeCookie(name: string = 'darkMode'): boolean {
  let darkMode: boolean = false;
  if (!isServer) {
    let dmcc = getClientCookie(name);
    if (dmcc?.length) {
      darkMode = dmcc === 'true' ? true : false;
    }
  } else {
    let event = getRequestEvent();
    let cookie = parseCookieByName<boolean>(
      event?.request.headers.get('cookie') || '',
      name
    );
    darkMode = cookie ? cookie : false;
  }
  return darkMode;
}
