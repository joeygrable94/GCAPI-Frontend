'use server';
import { APIEvent } from '@solidjs/start/server';
import { getSession } from '~/server/session';

export default async function GET(event: APIEvent) {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const session = await getSession(event);
  await session.clear();

  console.log('Auth0 logout');
  console.log('event.path', event);

  // return sendRedirect(event, '/', 302);
  return event.respondWith(new Response(JSON.stringify({ success: true })));
}
