'use server';
import { redirect } from '@solidjs/router';
import { getRequestEvent } from 'solid-js/web';
import { useSession } from 'vinxi/http';

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

export function getSession() {
  let reqEvent = getRequestEvent()!;
  return useSession<UserSessionData>(reqEvent!, {
    password: process.env.VITE_SESSION_SECRET || import.meta.env.VITE_SESSION_SECRET,
    name: 'gcapi_auth_session',
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
