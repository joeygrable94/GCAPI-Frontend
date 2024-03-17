import { CurrentUser, defaultGuestUser } from '~/features/auth';
import { getServerCookie } from '~/features/cookie/session.server';

export function useServerUserCookie(name: string = 'gcapi_user'): CurrentUser {
  let user: CurrentUser;
  const cookie = getServerCookie(name);
  user = cookie?.length ? (JSON.parse(cookie) as CurrentUser) : defaultGuestUser;
  return user;
}
