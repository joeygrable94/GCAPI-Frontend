import { useClientAuthCookie } from '~/features/auth';
import { useClientDarkModeCookie } from '~/features/theme';
import { useClientUserCookie } from '~/features/user/session.client';
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
