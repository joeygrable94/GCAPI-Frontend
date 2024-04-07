'use server';
import { redirect } from '@solidjs/router';
import { APIHandler } from '@solidjs/start/server';
import { AUTH_COOKIE_MAX_AGE, defaultAuthConfig } from '~/features/auth';
import { setServerCookie } from '~/features/cookie/session.server';
import { clearSession } from '~/features/session';
import { encryptData } from '~/shared/utils';

export const GET: APIHandler = async (event) => {
  await clearSession();
  setServerCookie('gcapi_auth', encryptData(defaultAuthConfig), {
    maxAge: AUTH_COOKIE_MAX_AGE
  });
  return redirect('/login', 307);
};
