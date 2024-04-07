import { useServerAuthCookie } from '~/features/auth';
import { useServerDarkModeCookie } from '~/features/theme';
import type { CookieConfig } from './types';

export function useServerCookieConfig(): CookieConfig {
  const darkModeCookie = useServerDarkModeCookie();
  const authCookie = useServerAuthCookie();
  return {
    darkMode: darkModeCookie,
    auth: authCookie
  };
}
