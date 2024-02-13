import { CurrentUser, defaultGuestUser } from '~/providers/auth';
import { getClientCookie } from '~/providers/cookie/session.client';

export function useClientUserCookie(name: string = 'gcapi_user'): CurrentUser {
  let user: CurrentUser;
  const usercookie = getClientCookie(name);
  user = usercookie?.length
    ? (JSON.parse(usercookie) as CurrentUser)
    : defaultGuestUser;
  return user;
}
