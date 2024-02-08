import { AuthConfig, defaultAuthConfig } from '~/providers/auth';

type CookieConfig = {
  auth: AuthConfig;
  darkMode: boolean | undefined;
};

export function useCookieConfig(): CookieConfig {
  const authCookie = defaultAuthConfig;
  const darkModeCookie = false;
  return {
    auth: authCookie,
    darkMode: darkModeCookie
  };
}
