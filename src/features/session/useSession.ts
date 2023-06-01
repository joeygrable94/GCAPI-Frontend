import { Session } from 'solid-start/session/sessions';
import { CookieSession } from './session';
import { Cookie, CookieSessionData, SessionHeaders } from './types';

/**
 * @description get user session data from cookie storage
 *
 * @param request server request
 * @returns session object
 */
export function useCookieSession(request: Request): Promise<Session> {
  return CookieSession.getSession(request.headers.get('Cookie'));
}

/**
 * @description create a new session with cookie storage
 *
 * @param data cookie session data to store
 * @returns session headers
 */
export async function createSession(data: CookieSessionData): Promise<SessionHeaders> {
  const session: Session = await CookieSession.getSession();
  if (data.csrf) session.set('csrf', data.csrf);
  return {
    headers: {
      'Set-Cookie': await CookieSession.commitSession(session)
    } as Cookie
  } as SessionHeaders;
}

/**
 * @description destroy cookie session data from storage
 *
 * @param request server request
 * @returns session headers
 */
export async function destroySession(request: Request): Promise<SessionHeaders> {
  const session: Session = await CookieSession.getSession(
    request.headers.get('Cookie')
  );
  return {
    headers: {
      'Set-Cookie': await CookieSession.destroySession(session)
    } as Cookie
  } as SessionHeaders;
}

/**
 * @description use cookie session data from storage
 *
 * @param request server request
 * @returns cookie session data
 */
export async function useCookieSessionData(request: Request): Promise<any> {
  const session: Session = await useCookieSession(request);
  const csrf: string = session.get('csrf') ? session.get('csrf') : '';
  return { csrf: csrf } as CookieSessionData;
}
