'use server';
import { APIEvent } from '@solidjs/start/server/types';
import { parseCookies, sendRedirect, setCookie } from 'vinxi/http';
import { defaultAuthConfig } from '~/providers/auth';
import { completeAuthorizationRequest } from '~/providers/auth/utils';
import { logError } from '~/shared/utils';

export async function GET(event: APIEvent) {
  const url = new URL(event.request.url);
  const code: string | null = url.searchParams.get('code');
  const state: string | null = url.searchParams.get('state');
  const cookies = parseCookies(event);
  const verification = JSON.parse(cookies[`com.auth0.auth.${state}`]);
  const [isAuthenticated, authState] = await completeAuthorizationRequest(
    code,
    state,
    verification,
    url
  );
  if (!isAuthenticated) {
    logError('Auth state is not valid');
    setCookie(event, 'gcapi_auth', JSON.stringify(defaultAuthConfig));
    return sendRedirect(event, '/login', 401);
  }
  setCookie(event, 'gcapi_auth', JSON.stringify(authState));
  return sendRedirect(event, '/', 302);
}
