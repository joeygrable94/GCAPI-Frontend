import { getRequestEvent, isServer } from 'solid-js/web';
import { CurrentUser, defaultGuestUser } from '~/providers/auth';
import { getClientCookie, parseCookieByName } from '~/shared/utils';

export function useUserCookie(name: string = 'gcapi_user'): CurrentUser {
  let user: CurrentUser = defaultGuestUser;
  if (!isServer) {
    let usercookie = getClientCookie(name);
    if (usercookie?.length) {
      user = JSON.parse(usercookie) as CurrentUser;
    }
  } else {
    let event = getRequestEvent();
    let cookie = parseCookieByName<CurrentUser>(
      event?.request.headers.get('cookie') || '',
      name
    );
    user = cookie ? cookie : defaultGuestUser;
  }
  return user;
}
