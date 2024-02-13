import { getRequestEvent, isServer } from 'solid-js/web';
import { parseCookies } from 'vinxi/server';
import { CurrentUser, defaultGuestUser } from '~/providers/auth';
import { getClientCookie } from '~/shared/utils';

export function useUserCookie(name: string = 'gcapi_user'): CurrentUser {
  let user: CurrentUser = defaultGuestUser;
  if (!isServer) {
    let usercookie = getClientCookie(name);
    if (usercookie?.length) {
      user = JSON.parse(usercookie) as CurrentUser;
    }
  } else {
    const event = getRequestEvent();
    const cookies = parseCookies(event!);
    user = cookies[name] ? JSON.parse(cookies[name]) : defaultGuestUser;
  }
  return user;
}
