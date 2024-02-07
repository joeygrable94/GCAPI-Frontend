'use server';
import { redirect } from '@solidjs/router';
import { APIEvent, H3Event, useSession } from '@solidjs/start/server';
import { getRequestEvent } from 'solid-js/web';

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
  accessToken: string | undefined;
  refreshToken?: string;
  tokenType?: string;
  idToken: string | undefined;
}

export function getSession(event: H3Event | APIEvent | undefined = undefined) {
  let reqEvent = event ?? getRequestEvent()!;
  return useSession<UserSessionData>(reqEvent!, {
    password: import.meta.env.VITE_SESSION_SECRET,
    name: 'gcapi_auth',
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

export async function logout() {
  const session = await getSession();
  await session.clear();
  throw redirect('/login');
}
