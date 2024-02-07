import { AuthConfig } from '~/providers/auth';
import { useAuthCookie } from '~/providers/auth/session';
import { useDarkModeCookie } from '~/providers/theme/session';

type CookieConfig = {
  auth: AuthConfig;
  darkMode: boolean | undefined;
};

export function useCookieConfig(): CookieConfig {
  const authCookie = useAuthCookie();
  const darkModeCookie = useDarkModeCookie();
  return {
    auth: authCookie,
    darkMode: darkModeCookie
  };
}
