import { CurrentUser, defaultGuestUser } from '~/providers/auth';
import { getServerCookie } from '~/providers/cookie/session.server';

export function useServerUserCookie(name: string = 'gcapi_user'): CurrentUser {
  let user: CurrentUser;
  const cookie = getServerCookie(name);
  user = cookie?.length ? (JSON.parse(cookie) as CurrentUser) : defaultGuestUser;
  return user;
}
