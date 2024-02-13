import { useServerAuthCookie } from '~/providers/auth/session.server';
import { useServerDarkModeCookie } from '~/providers/theme/session.server';
import { useServerUserCookie } from '~/providers/user/session.server';
import type { CookieConfig } from './types';

export function useServerCookieConfig(): CookieConfig {
  const darkModeCookie = useServerDarkModeCookie();
  const authCookie = useServerAuthCookie();
  const userCookie = useServerUserCookie();
  return {
    darkMode: darkModeCookie,
    auth: authCookie,
    user: userCookie
  };
}
