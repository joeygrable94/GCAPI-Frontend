'use server';
import { redirect } from '@solidjs/router';
import { APIHandler } from '@solidjs/start/server';
import { AUTH_COOKIE_MAX_AGE, defaultAuthConfig } from '~/features/auth';
import { setServerCookie } from '~/features/cookie/session.server';
import { encryptData } from '~/features/encrypt';
import { getSession } from '~/features/session';

export const GET: APIHandler = async (event) => {
  const session = await getSession();
  await session.clear();
  setServerCookie('gcapi_auth', encryptData(defaultAuthConfig), {
    maxAge: AUTH_COOKIE_MAX_AGE
  });
  return redirect('/login', 307);
};
