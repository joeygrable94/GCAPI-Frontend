'use server';
import { redirect } from '@solidjs/router';
import { APIHandler } from '@solidjs/start/server';
import { defaultAuthConfig } from '~/features/auth';
import { setServerCookie } from '~/features/cookie/session.server';

export const GET: APIHandler = async (event) => {
  setServerCookie('gcapi_auth', JSON.stringify(defaultAuthConfig));
  return redirect('/login', 302);
};
