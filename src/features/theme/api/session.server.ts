import { getServerCookie } from '~/features/cookie/session.server';

export function useServerDarkModeCookie(name: string = 'darkMode'): boolean {
  let darkMode: boolean;
  const cookie = getServerCookie(name);
  darkMode = cookie?.length ? (JSON.parse(cookie) as boolean) : false;
  return darkMode;
}
