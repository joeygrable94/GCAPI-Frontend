'use server';
import { APIEvent } from '@solidjs/start/server/types';
import { sendRedirect, setCookie } from 'vinxi/server';
import { defaultAuthConfig } from '~/providers/auth';

export async function GET(event: APIEvent) {
  setCookie(event, 'gcapi_auth', JSON.stringify(defaultAuthConfig));
  return sendRedirect(event, '/login', 302);
}
