'use server';
import { APIEvent } from '@solidjs/start/server/types';
import { parseCookies, sendRedirect } from 'vinxi/server';
import { completeAuthorizationRequest } from '~/providers/auth/utils';
import { UserSessionData, getSession } from '~/shared/server/session';
import { log, logError } from '~/shared/utils';

export async function GET(event: APIEvent) {
  const session = await getSession();
  console.log(session.id, session.data);
  const url = new URL(event.request.url);
  const code: string | null = url.searchParams.get('code');
  const state: string | null = url.searchParams.get('state');
  const cookies = parseCookies(event);
  const verification = JSON.parse(cookies[`com.auth0.auth.${state}`]);
  const [isAuthenticated, authState] = await completeAuthorizationRequest(
    code,
    state,
    verification,
    url
  );
  if (!isAuthenticated) {
    logError('Auth state is not valid');
    await session.clear();
    return sendRedirect(event, '/login', 401);
  } else {
    const newSession = {
      accessToken: authState.accessToken,
      refreshToken: authState.refreshToken,
      tokenType: authState.tokenType,
      idToken: authState.idToken
    } as UserSessionData;
    await session.update((d: UserSessionData) => {
      log('Updating session data', d, newSession);
      d = newSession;
      return d;
    });
  }
  return sendRedirect(event, '/', 302);
}
