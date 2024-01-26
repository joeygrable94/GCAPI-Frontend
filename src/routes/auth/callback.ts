'use server';
import { APIEvent, parseCookies, sendRedirect, setCookie } from '@solidjs/start/server';
import { AES } from 'crypto-js';
import { auth0FetchOAuthToken, auth0UserInfo } from '~/components';
import { UserInfo, UserSessionData, getSession } from '~/server/session';

export async function GET(event: APIEvent) {
  let baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const session = await getSession(event);
  const url = new URL(event.request.url);
  const code: string | null = url.searchParams.get('code');
  const state: string | null = url.searchParams.get('state');
  const cookies = parseCookies(event);
  const verification = JSON.parse(cookies[`com.auth0.auth.${state}`]);

  if (!verification) {
    console.error('No verification cookie found');
    await session.clear();
    return sendRedirect(event, '/login', 500);
  }

  if (import.meta.env.VITE_DEBUG) {
    console.log('Auth0 callback');
    console.log('event.path', event.request.url);
    console.log('baseUrl', baseUrl);
    console.log('state verification');
    console.log(state);
    console.log(verification);
  }

  if (code === undefined || code === null) {
    console.error('No code found');
    await session.clear();
    return sendRedirect(event, '/login', 500);
  }

  if (state === undefined || state === null) {
    console.error('No auth state found');
    await session.clear();
    return sendRedirect(event, '/login', 500);
  }

  if (state !== verification.state) {
    console.error('Code and state do not match verification');
    await session.clear();
    return sendRedirect(event, '/login', 403);
  }

  let redirectUrl = import.meta.env.VITE_AUTH0_REDIRECT_URI;
  if (import.meta.env.VITE_AUTH0_REWRITE_REDIRECT === 'true') {
    const orgName = url.hostname.split('.')[0];
    redirectUrl = import.meta.env.VITE_AUTH0_REDIRECT_URI.replace('org_id', orgName);
    baseUrl = import.meta.env.VITE_APP_BASE_URL.replace(
      'https://',
      `https://${orgName}.`
    );
  }

  const jsonAuthToken = await auth0FetchOAuthToken(
    code,
    state,
    redirectUrl,
    verification.organization
  );

  if (import.meta.env.VITE_DEBUG) {
    console.log('auth0FetchOAuthToken');
    console.log(jsonAuthToken);
  }

  const userInfo = await auth0UserInfo(jsonAuthToken.access_token);
  if (import.meta.env.VITE_DEBUG) {
    console.log('auth0UserInfo');
    console.log(userInfo);
  }
  if (userInfo === undefined) {
    await session.clear();
    return sendRedirect(event, '/login', 401);
  }

  const newSession = {
    accessToken: jsonAuthToken.access_token,
    refreshToken: jsonAuthToken.refresh_token,
    tokenType: jsonAuthToken.token_type,
    idToken: jsonAuthToken.id_token,
    user: {
      sub: userInfo.sub,
      nickname: userInfo.nickname,
      name: userInfo.name,
      picture: userInfo.picture,
      updated_at: userInfo.updated_at,
      email: userInfo.email,
      email_verified: userInfo.email_verified
    } as UserInfo
  } as UserSessionData;
  await session.update((d) => {
    d = newSession;
    return d;
  });

  let newState = {
    accessToken: jsonAuthToken.access_token,
    refreshToken: jsonAuthToken.refresh_token,
    tokenType: jsonAuthToken.token_type,
    idToken: jsonAuthToken.id_token
  };
  setCookie(event, 'gcapi_auth', JSON.stringify(newState), {
    encode: (v) => AES.encrypt(v, import.meta.env.VITE_SESSION_SECRET).toString()
  });
  return sendRedirect(event, '/', 302);
}
