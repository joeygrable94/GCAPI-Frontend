import { getClientCookie } from '~/features/cookie/session.client';

export function useClientDarkModeCookie(name: string = 'darkMode'): boolean {
  let darkMode: boolean;
  let dmcc = getClientCookie(name);
  darkMode = dmcc?.length ? (darkMode = dmcc === 'true' ? true : false) : false;
  return darkMode;
}
