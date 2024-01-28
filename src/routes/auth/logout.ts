import { APIEvent } from '@solidjs/start/server/types.js';
import { AES } from 'crypto-js';
import { sendRedirect, setCookie } from 'vinxi/server';
import { defaultAuthState } from '~/components/auth/constants';
import { getSession } from '~/server/session.js';

export async function GET(event: APIEvent) {
  const session = await getSession(event);
  await session.clear();
  setCookie(event, 'gcapi_auth', JSON.stringify(defaultAuthState), {
    encode: (v) => AES.encrypt(v, import.meta.env.VITE_SESSION_SECRET).toString()
  });
  return sendRedirect(event, '/login', 302);
}
