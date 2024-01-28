'use server';
import { APIEvent, parseCookies, sendRedirect, setCookie } from '@solidjs/start/server';
import { AES } from 'crypto-js';
import { completeAuthorization } from '~/components';
import { UserSessionData, getSession } from '~/server/session';

export async function GET(event: APIEvent) {
  const session = await getSession(event);
  const url = new URL(event.request.url);
  const code: string | null = url.searchParams.get('code');
  const state: string | null = url.searchParams.get('state');
  const cookies = parseCookies(event);
  const verification = JSON.parse(cookies[`com.auth0.auth.${state}`]);
  const [isAuthenticated, authState] = await completeAuthorization(
    code,
    state,
    verification,
    url
  );
  if (!isAuthenticated) {
    console.error('Auth state is not valid');
    await session.clear();
    return sendRedirect(event, '/login', 401);
  } else {
    console.log('Updating auth session');
    const newSession = {
      accessToken: authState.accessToken,
      refreshToken: authState.refreshToken,
      tokenType: authState.tokenType,
      idToken: authState.idToken
    } as UserSessionData;
    await session.update((d) => {
      d = newSession;
      return d;
    });
  }
  setCookie(event, 'gcapi_auth', JSON.stringify(authState), {
    encode: (v) => AES.encrypt(v, import.meta.env.VITE_SESSION_SECRET).toString()
  });
  return sendRedirect(event, '/', 302);
}
