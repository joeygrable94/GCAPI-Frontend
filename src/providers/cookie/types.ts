import type { AuthConfig, CurrentUser } from '~/providers/auth';

export type CookieConfig = {
  darkMode: boolean;
  auth: AuthConfig;
  user: CurrentUser;
};
