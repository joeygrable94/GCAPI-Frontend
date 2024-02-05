import { AuthConfig, GuestUser } from './types';

// Cookie max-age = one day (86400) since this is sensitive info
export const AUTH_COOKIE_MAX_AGE = 1 * 60 * 60 * 24 * 1;

export const defaultAuthConfig: AuthConfig = {
  accessToken: '',
  refreshToken: '',
  tokenType: '',
  idToken: ''
};

export const defaultGuestUser: GuestUser = { username: 'guest' };
