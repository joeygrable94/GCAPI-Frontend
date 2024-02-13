import type { AuthConfig, CurrentUser } from '~/providers/auth';
import { useClientAuthCookie } from '~/providers/auth/session.client';
import { useClientDarkModeCookie } from '~/providers/theme/session.client';
import { useClientUserCookie } from '~/providers/user/session.client';

type CookieConfig = {
  darkMode: boolean;
  auth: AuthConfig;
  user: CurrentUser;
};

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
