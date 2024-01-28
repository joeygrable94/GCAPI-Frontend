'use server';
import { redirect } from '@solidjs/router';
import { H3Event, useSession } from '@solidjs/start/server';
import auth0, { Authentication } from 'auth0-js';
import { getRequestEvent } from 'solid-js/web';
import { log } from '~/utils';

export type UserInfo = {
  sub: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
};

export interface UserSessionData {
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
  idToken: string;
}

export function getSession(event: H3Event | undefined = undefined) {
  let reqEvent = event ?? getRequestEvent()!;
  // console.log('Request Event Cookies: ', event?.headers.get('cookie'));
  return useSession<UserSessionData>(reqEvent!, {
    password: import.meta.env.VITE_SESSION_SECRET,
    name: 'gcapi_session',
    cookie: {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1) // 86400
    }
  });
}

export async function getUser() {
  const session = await getSession();
  console.log('Get User Session: ', session.id, session.data);
  return { id: 'FAKE10-ID5875-A8D32K-A9F4J7', email: 'fake@getcommunity.com' };
}

export async function login(formData: FormData) {
  const username = String(formData.get('username'));
  const password = String(formData.get('password'));
  const opts: auth0.AuthOptions = {
    _sendTelemetry: false,
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientID: import.meta.env.VITE_AUTH0_CLIENT_ID
  };
  const auth: Authentication = new auth0.Authentication(opts);
  let redirectUrl = auth.buildAuthorizeUrl({
    redirectUri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
    responseType: 'token id_token',
    scope: import.meta.env.VITE_AUTH0_SCOPE,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE
  });
  log(redirectUrl);
  // do validation
  try {
    const session = await getSession();
    console.log('Login Session: ', session.id, session.data);
    // const user = await db.user.findUnique({ where: { username } });
    const user = { id: '1234123412341234', username: 'test', password: 'test' };
    // if (!user || password !== user.password) return new Error('Invalid login');
    // await session.update((d: UserSessionData) => (d.userId = user!.id));
  } catch (err) {
    return err as Error;
  }
  throw redirect('/');
}

export async function logout() {
  const session = await getSession();
  console.log('Logout Session: ', session.id, session.data);
  // await session.update((d: UserSessionData) => (d.userId = undefined));
  throw redirect('/login');
}
