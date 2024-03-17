import { CurrentUser, defaultGuestUser } from '~/features/auth';
import { getClientCookie } from '~/features/cookie/session.client';

export function useClientUserCookie(name: string = 'gcapi_user'): CurrentUser {
  let user: CurrentUser;
  const usercookie = getClientCookie(name);
  user = usercookie?.length
    ? (JSON.parse(usercookie) as CurrentUser)
    : defaultGuestUser;
  return user;
}
