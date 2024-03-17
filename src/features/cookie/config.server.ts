import { useServerAuthCookie } from '~/features/auth';
import { useServerDarkModeCookie } from '~/features/theme';
import { useServerUserCookie } from '~/features/user/session.server';
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
