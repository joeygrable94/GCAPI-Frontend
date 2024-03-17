'use server';
import { redirect } from '@solidjs/router';
import { APIHandler } from '@solidjs/start/server';
import { completeAuthorizationRequest, defaultAuthConfig } from '~/features/auth';
import { getServerCookie, setServerCookie } from '~/features/cookie/session.server';
import { logError } from '~/shared/utils';

export const GET: APIHandler = async (event) => {
  const url = new URL(event.request.url);
  const code: string | null = url.searchParams.get('code');
  const state: string | null = url.searchParams.get('state');
  const cookie = getServerCookie(`com.auth0.auth.${state}`);
  if (!cookie) {
    return redirect('/login', 401);
  }
  const verification = JSON.parse(cookie);
  const [isAuthenticated, authState] = await completeAuthorizationRequest(
    code,
    state,
    verification,
    url
  );
  if (!isAuthenticated) {
    logError('Auth state is not valid');
    setServerCookie('gcapi_auth', JSON.stringify(defaultAuthConfig));
    return redirect('/login', 401);
  }
  setServerCookie('gcapi_auth', JSON.stringify(authState));
  return redirect('/', 302);
};
