import type { AuthConfig, CurrentUser } from '~/features/auth';

export type CookieConfig = {
  darkMode: boolean;
  auth: AuthConfig;
  user: CurrentUser;
};
