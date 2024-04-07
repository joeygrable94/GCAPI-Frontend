'use server';
import { redirect } from '@solidjs/router';
import { APIHandler } from '@solidjs/start/server';
import {
  AUTH_COOKIE_MAX_AGE,
  AuthConfig,
  completeAuthorizationRequest,
  defaultAuthConfig
} from '~/features/auth';
import { getServerCookie, setServerCookie } from '~/features/cookie/session.server';
import { clearSession, getSession } from '~/features/session';
import { encryptData, logError } from '~/shared/utils';

export const GET: APIHandler = async (event) => {
  const url = new URL(event.request.url);
  const code: string | null = url.searchParams.get('code');
  const state: string | null = url.searchParams.get('state');
  const cookie = getServerCookie(`com.auth0.auth.${state}`);
  if (!cookie) {
    await clearSession();
    setServerCookie('gcapi_auth', encryptData<AuthConfig>(defaultAuthConfig), {
      maxAge: AUTH_COOKIE_MAX_AGE
    });
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
    await clearSession();
    setServerCookie('gcapi_auth', encryptData<AuthConfig>(defaultAuthConfig), {
      maxAge: AUTH_COOKIE_MAX_AGE
    });
    return redirect('/login', 401);
  }
  const session = await getSession();
  await session.update((data) => ({
    idToken: authState.idToken ?? data.idToken,
    accessToken: authState.accessToken ?? data.accessToken,
    refreshToken: authState.refreshToken ?? data.refreshToken
  }));
  setServerCookie('gcapi_auth', encryptData<AuthConfig>(authState), {
    maxAge: AUTH_COOKIE_MAX_AGE
  });
  return redirect('/', 307);
};
