import { error, getCookie, warn } from '~/utils';
import { defaultAuthState } from './constants';
import { CurrentUser, IAuthState, UpdatedAuthState, UserRole } from './types';

/**
 * @summary Returns a boolean if the input user is an Admin
 */
export const isAdmin = (user: CurrentUser) => {
  if (user === undefined) return false;
  let userKeys: string[] = Object.keys(user);
  if (userKeys.includes('is_superuser')) return true;
  return false;
};

export const isManager = (user: CurrentUser) => {
  if (user === undefined) return false;
  let userKeys: string[] = Object.keys(user);
  if (userKeys.includes('scopes') && !userKeys.includes('is_superuser')) return true;
  return false;
};

export const getUserRole = (user: CurrentUser): UserRole => {
  if (user === undefined) return 'user';
  if (isAdmin(user)) return 'admin';
  if (isManager(user)) return 'manager';
  return 'user';
};

/**
 * @summary Completes the authorization process by getting the access token and user info
 *
 * @param code string of the code in the redirect uri from Auth0
 * @param state string of the state to be used to get the access token
 * @returns a new IAuthState object containing the access token and user info
 */
export async function completeAuthorization(
  code: string,
  state: string
): Promise<UpdatedAuthState> {
  const cookies = getCookie(`com.auth0.auth.${state}`);
  const verification = JSON.parse(cookies);
  if (!verification) {
    warn('No verification cookie found');
    return [false, defaultAuthState];
  }
  if (code === undefined || code === null) {
    error('No code found');
    return [false, defaultAuthState];
  }
  if (state !== verification.state) {
    error('Code and state do not match verification');
    return [false, defaultAuthState];
  }
  let redirectUrl = import.meta.env.VITE_AUTH0_REDIRECT_URI;
  const jsonAuthToken = await auth0FetchOAuthToken(
    code,
    state,
    redirectUrl,
    verification.organization
  );
  const userInfo = await auth0UserInfo(jsonAuthToken.access_token);
  if (userInfo === undefined) {
    warn('No user info found');
    return [false, defaultAuthState];
  }
  let newAuthState = {} as IAuthState;
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
export async function refresh(refreshToken: string) {
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
export async function auth0UserInfo(accessToken: string) {
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
export async function auth0FetchOAuthToken(
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
