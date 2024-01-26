'use server';
import { H3Event, useSession } from '@solidjs/start/server';
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
  idToken: string | undefined;
  refreshToken?: string;
  scope: string | undefined;
  tokenType?: string;
  userInfo: UserInfo | undefined;
  userId: string | undefined;
  permissions: string[] | [];
}

export function getSession(event: H3Event | undefined = undefined) {
  let reqEvent = event ?? getRequestEvent()!;
  // console.log('Request Event Cookies: ', event?.headers.get('cookie'));
  return useSession(reqEvent!, {
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
  console.log('Session: ', session.id, session.data);
  return { id: 'FAKE10-ID5875-A8D32K-A9F4J7', email: 'fake@getcommunity.com' };
}

/*
export async function login(formData: FormData) {
  const username = String(formData.get('username'));
  const password = String(formData.get('password'));
  // do validation
  try {
    const session = await getSession();
    // const user = await db.user.findUnique({ where: { username } });
    const user = { id: '1234123412341234', username: 'test', password: 'test' };
    if (!user || password !== user.password) return new Error('Invalid login');
    await session.update((d: UserSessionData) => (d.userId = user!.id));
  } catch (err) {
    return err as Error;
  }
  throw redirect('/');
}

export async function logout() {
  const session = await getSession();
  await session.update((d: UserSessionData) => (d.userId = undefined));
  throw redirect('/login');
}
*/
