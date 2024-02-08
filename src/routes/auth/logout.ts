'use server';
import { APIEvent } from '@solidjs/start/server/types';
import { sendRedirect } from 'vinxi/server';
import { getSession } from '~/shared/server/session';

export async function GET(event: APIEvent) {
  const session = await getSession();
  console.log(session.id, session.data);
  await session.clear();
  return sendRedirect(event, '/login', 302);
}
