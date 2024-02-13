import { useClientAuthCookie } from '~/providers/auth/session.client';
import { useClientDarkModeCookie } from '~/providers/theme/session.client';
import { useClientUserCookie } from '~/providers/user/session.client';
import type { CookieConfig } from './types';

export function useClientCookieConfig(): CookieConfig {
  const darkModeCookie = useClientDarkModeCookie();
  const authCookie = useClientAuthCookie();
  const userCookie = useClientUserCookie();
  return {
    darkMode: darkModeCookie,
    auth: authCookie,
    user: userCookie
  };
}
