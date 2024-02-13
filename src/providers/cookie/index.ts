import { AuthConfig, CurrentUser } from '~/providers/auth';
import { useAuthCookie } from '~/providers/auth/session';
import { useDarkModeCookie } from '~/providers/theme/session';
import { useUserCookie } from '~/providers/user/session';

type CookieConfig = {
  darkMode: boolean;
  auth: AuthConfig;
  user: CurrentUser;
};

export function useCookieConfig(): CookieConfig {
  const darkModeCookie = useDarkModeCookie();
  const authCookie = useAuthCookie();
  const userCookie = useUserCookie();
  return {
    darkMode: darkModeCookie,
    auth: authCookie,
    user: userCookie
  };
}
