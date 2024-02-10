'use server';
import { APIEvent } from '@solidjs/start/server/types';
import { parseCookies, sendRedirect, setCookie } from 'vinxi/server';
import { defaultAuthConfig } from './constants';
import { completeAuthorizationRequest } from './utils';

export async function getLoginRequest(event: APIEvent) {
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
    setCookie(event, 'gcapi_auth', JSON.stringify(defaultAuthConfig));
    return sendRedirect(event, '/login', 401);
  }
  setCookie(event, 'gcapi_auth', JSON.stringify(authState));
  return sendRedirect(event, '/', 302);
}

export async function getLogoutRequest(event: APIEvent) {
  setCookie(event, 'gcapi_auth', JSON.stringify(defaultAuthConfig));
  return sendRedirect(event, '/login', 302);
}
