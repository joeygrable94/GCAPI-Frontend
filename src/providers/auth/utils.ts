import { log, logError, warn } from '~/shared/utils';
import { defaultAuthConfig } from './constants';
import { AuthConfig, UpdatedAuthConfig } from './types';

/**
 * @summary Completes the authorization process by getting the access token and user info
 *
 * @param code string of the code in the redirect uri from Auth0
 * @param state string of the state to be used to get the access token
 * @returns a new AuthConfig object containing the access token and user info
 */
export async function completeAuthorizationRequest(
  code: string | null,
  state: string | null,
  verification: any,
  url: URL
): Promise<UpdatedAuthConfig> {
  let baseUrl = import.meta.env.VITE_APP_BASE_URL;
  if (!verification) {
    if (import.meta.env.VITE_DEBUG) warn('No verification cookie found');
    return [false, defaultAuthConfig];
  }
  if (code === undefined || code === null) {
    if (import.meta.env.VITE_DEBUG) logError('No code found');
    return [false, defaultAuthConfig];
  }
  if (state === undefined || state === null) {
    if (import.meta.env.VITE_DEBUG) logError('No state found');
    return [false, defaultAuthConfig];
  }
  if (state !== verification.state) {
    if (import.meta.env.VITE_DEBUG)
      logError('Code and state do not match verification');
    return [false, defaultAuthConfig];
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
  const jsonAuthToken = await fetchOAuthToken(
    code,
    state,
    redirectUrl,
    verification.organization
  );
  if (import.meta.env.VITE_DEBUG) log('Auth token:', jsonAuthToken);
  const userInfo = await fetchAuthUserInfo(jsonAuthToken.access_token);
  if (userInfo === undefined) {
    if (import.meta.env.VITE_DEBUG) warn('No user info found');
    return [false, defaultAuthConfig];
  }
  if (import.meta.env.VITE_DEBUG) log('User info:', userInfo);
  let newAuthState = {} as AuthConfig;
  newAuthState.accessToken = jsonAuthToken.access_token;
  newAuthState.refreshToken = jsonAuthToken.refresh_token ?? undefined;
  newAuthState.tokenType = jsonAuthToken.accessToken_type;
  newAuthState.idToken = jsonAuthToken.id_token;
  return [true, newAuthState];
}

/**
 * @summary Refreshes the access token using the refresh token
 *
 * @param refreshToken string of the refresh token to be used to refresh the access token
 * @returns json object containing the new access token and refresh token
 */
export async function refreshAuthorization(refreshToken: string) {
  const endpoint = new URL(`https://${import.meta.env.VITE_AUTH0_DOMAIN}/oauth/token`);

  const formData = new URLSearchParams();
  formData.append('grant_type', 'refresh_token');
  formData.append('client_id', import.meta.env.VITE_AUTH0_CLIENT_ID);
  formData.append('client_secret', import.meta.env.VITE_AUTH0_CLIENT_SECRET!);
  formData.append('refresh_token', refreshToken);

  const authToken = await fetch(endpoint, {
    method: 'POST',
    body: formData
  });

  return authToken.json();
}

/**
 * @summary Gets the user info from the access token
 *
 * @param accessToken string of the access token to be used to get the user info
 * @returns json object containing the user info
 */
export async function fetchAuthUserInfo(accessToken: string) {
  const endpoint = new URL(`https://${import.meta.env.VITE_AUTH0_DOMAIN}/userinfo`);

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

/**
 * @summary Gets the authorization token from the code, state and redirect url
 *
 * @param code string of the code to be used to get the access token
 * @param state string of the state to be used to get the access token
 * @param redirectUrl string of the redirect url to be used to get the access token
 * @param organization optional string of the organization to be used to get the access token
 * @returns json object containing the access token and refresh token
 */
export async function fetchOAuthToken(
  code: string,
  state: string,
  redirectUrl: string,
  organization: string | undefined
) {
  const endpoint = new URL(`https://${import.meta.env.VITE_AUTH0_DOMAIN}/oauth/token`);

  const scopes = ['openid', 'profile'];
  if (import.meta.env.VITE_AUTH0_OFFLINE_ACCESS === 'true') {
    scopes.push('offline_access');
  }

  if (import.meta.env.VITE_AUTH0_PERMISSIONS === 'true') {
    scopes.push('permissions');
  }

  const formData = new URLSearchParams();
  formData.append('grant_type', 'authorization_code');
  formData.append('client_id', import.meta.env.VITE_AUTH0_CLIENT_ID);
  formData.append('client_secret', import.meta.env.VITE_AUTH0_CLIENT_SECRET!);
  formData.append('code', code);
  formData.append('state', state);
  formData.append('redirect_uri', redirectUrl);
  formData.append('scope', scopes.join(' '));

  if (organization) {
    formData.append('organization', organization);
  }

  if (import.meta.env.VITE_AUTH0_AUDIENCE) {
    formData.append('audience', import.meta.env.VITE_AUTH0_AUDIENCE);
  }

  const authToken = await fetch(endpoint, {
    method: 'POST',
    body: formData
  });

  return authToken.json();
}
