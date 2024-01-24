import { redirect } from '@solidjs/router';
import { APIEvent, parseCookies } from '@solidjs/start/server';
// import { UserSessionData, getSession } from '~/api/server';
import { auth0FetchOAuthToken, auth0UserInfo } from '~/components';

export async function GET(event: APIEvent) {
  console.log('Auth0 callback');
  console.log('event.request.url', event.request.url);

  let baseUrl = import.meta.env.VITE_APP_BASE_URL;
  if (import.meta.env.VITE_DEBUG) {
    console.log('baseUrl', baseUrl);
  }

  const url = new URL(event.request.url);
  // const session = await getSession(event);
  const headers = new Headers();
  const code: string | null = url.searchParams.get('code');
  const state: string | null = url.searchParams.get('state');
  const cookies = parseCookies(event);
  const verification = JSON.parse(cookies[`com.auth0.auth.${state}`]);

  if (!verification) {
    console.error('No verification cookie found');
    return new Response(JSON.stringify({ error: 'verification failed' }), {
      status: 500
    });
  }

  if (import.meta.env.VITE_DEBUG) {
    console.log('state verification');
    console.log(state);
    console.log(verification);
  }

  if (code === undefined || code === null) {
    console.error('No code found');
    return new Response(JSON.stringify({ error: 'missing code' }), {
      status: 500
    });
  }

  if (state === undefined || state === null) {
    console.error('No auth state found');
    return new Response(JSON.stringify({ error: 'missing state' }), {
      status: 500
    });
  }

  if (state !== verification.state) {
    console.error('Code and state do not match verification');
    return new Response(
      JSON.stringify({ error: 'code and state verification failed' }),
      {
        status: 403
      }
    );
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
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401
    });
  }

  /*
  await session.update(
    (d: UserSessionData) => (d.accessToken = jsonAuthToken.access_token)
  );
  if (jsonAuthToken.refresh_token) {
    await session.update(
      (d: UserSessionData) => (d.refreshToken = jsonAuthToken.refresh_token)
    );
  }
  await session.update((d: UserSessionData) => (d.idToken = jsonAuthToken.id_token));
  await session.update((d: UserSessionData) => (d.scope = jsonAuthToken.scope));
  await session.update(
    (d: UserSessionData) => (d.tokenType = jsonAuthToken.accessToken_type)
  );
  await session.update((d: UserSessionData) => (d.userInfo = userInfo));
  await session.update((d: UserSessionData) => (d.userId = userInfo.sub));
  await session.update((d: UserSessionData) => (d.orgId = userInfo.org_id));
  await session.update((d: UserSessionData) => (d.permissions = userInfo.permissions));

  headers.append('Content-Type', 'text/html; charset=utf-8');
  if (session.id) {
    headers.append('Set-Cookie', session.id ? `session=${session.id}` : '');
  }
  */

  const body = `<html><head>
    <meta http-equiv="refresh" content="0; url=${baseUrl}" />
  </head><body></body></html>`;

  return redirect('/', { headers });
  // return new Response(body, { headers });
}
