import { AuthConfig, useAuthCookie } from '~/providers/auth';
import { useDarkModeCookie } from '~/providers/theme';

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
