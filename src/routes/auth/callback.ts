import { APIEvent } from '@solidjs/start/server';
import { parseCookies } from 'vinxi/server';
import { getSession } from '~/api/server';
// import { storage } from '../session.js'

async function auth0UserInfo(accessToken: string) {
  const endpoint = new URL(`https://${import.meta.env.AUTH0_DOMAIN}/userinfo`);

  const userInfo = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (userInfo.status !== 200) {
    return undefined;
  }

  return userInfo.json();
}

async function auth0FetchOAuthToken(
  code: string,
  state: string,
  redirectUrl: string,
  organization: string | undefined
) {
  const endpoint = new URL(`https://${import.meta.env.AUTH0_DOMAIN}/oauth/token`);

  const scopes = ['openid', 'profile'];
  if (import.meta.env.AUTH0_OFFLINE_ACCESS === 'true') {
    scopes.push('offline_access');
  }

  if (import.meta.env.AUTH0_PERMISSIONS === 'true') {
    scopes.push('permissions');
  }

  const formData = new URLSearchParams();
  formData.append('grant_type', 'authorization_code');
  formData.append('client_id', import.meta.env.AUTH0_CLIENT_ID);
  formData.append('client_secret', process.env.AUTH0_CLIENT_SECRET!);
  formData.append('code', code);
  formData.append('state', state);
  formData.append('redirect_uri', redirectUrl);
  formData.append('scope', scopes.join(' '));

  if (organization) {
    formData.append('organization', organization);
  }

  if (import.meta.env.AUTH0_AUDIENCE) {
    formData.append('audience', import.meta.env.AUTH0_AUDIENCE);
  }

  if (process.env.DEBUG) {
    console.log('formData');
    console.log(formData);
  }

  const authToken = await fetch(endpoint, {
    method: 'POST',
    body: formData
  });

  return authToken.json();
}

export default async function GET(event: APIEvent) {
  let baseUrl = import.meta.env.APP_BASE_URL;
  if (process.env.DEBUG) {
    console.log('baseUrl', baseUrl);
  }

  const url = new URL(event.request.url);
  const session = await getSession(event);
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

  if (process.env.DEBUG) {
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

  let redirectUrl = import.meta.env.AUTH0_REDIRECT_URI;
  if (import.meta.env.AUTH0_REWRITE_REDIRECT === 'true') {
    const orgName = url.hostname.split('.')[0];
    redirectUrl = import.meta.env.AUTH0_REDIRECT_URI.replace('org_id', orgName);
    baseUrl = import.meta.env.APP_BASE_URL.replace('https://', `https://${orgName}.`);
  }

  const jsonAuthToken = await auth0FetchOAuthToken(
    code,
    state,
    redirectUrl,
    verification.organization
  );

  if (process.env.DEBUG) {
    console.log('auth0FetchOAuthToken');
    console.log(jsonAuthToken);
  }

  const userInfo = await auth0UserInfo(jsonAuthToken.access_token);
  if (process.env.DEBUG) {
    console.log('auth0UserInfo');
    console.log(userInfo);
  }
  if (userInfo === undefined) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401
    });
  }

  // await session.update((d: UserSession) => (d.userId = user!.id));

  session.set('accessToken', jsonAuthToken.access_token);
  if (jsonAuthToken.refresh_token) {
    session.set('refreshToken', jsonAuthToken.refresh_token);
  }
  session.set('idToken', jsonAuthToken.id_token);
  session.set('scope', jsonAuthToken.scope);
  session.set('tokenType', jsonAuthToken.accessToken_type);
  session.set('userInfo', userInfo);
  session.set('userId', userInfo.sub);
  session.set('orgId', userInfo.org_id);
  session.set('permissions', userInfo.permissions);

  headers.append('Content-Type', 'text/html; charset=utf-8');
  headers.append('Set-Cookie', session.id ? `session=${session.id}` : '');
  // headers.append('Set-Cookie', await storage.commitSession(session))

  const body = `<html><head>
    <meta http-equiv="refresh" content="0; url=${baseUrl}" />
  </head><body></body></html>`;

  return new Response(body, { headers });
}
