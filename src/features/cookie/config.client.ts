import { useClientAuthCookie } from '~/features/auth';
import { useClientDarkModeCookie } from '~/features/theme';
import type { CookieConfig } from './types';

export function useClientCookieConfig(): CookieConfig {
  const darkModeCookie = useClientDarkModeCookie();
  const authCookie = useClientAuthCookie();
  return {
    darkMode: darkModeCookie,
    auth: authCookie
  };
}
