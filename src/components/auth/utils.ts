/**
 * @summary Refreshes the access token using the refresh token
 *
 * @param refreshToken string of the refresh token to be used to refresh the access token
 * @returns json object containing the new access token and refresh token
 */
export async function refresh(refreshToken: string) {
  if (import.meta.env.VITE_DEBUG) {
    console.log('refreshToken');
  }
  const endpoint = new URL(`https://${import.meta.env.VITE_AUTH0_DOMAIN}/oauth/token`);

  const formData = new URLSearchParams();
  formData.append('grant_type', 'refresh_token');
  formData.append('client_id', import.meta.env.VITE_AUTH0_CLIENT_ID);
  formData.append('client_secret', import.meta.env.VITE_AUTH0_CLIENT_SECRET!);
  formData.append('refresh_token', refreshToken);

  if (import.meta.env.VITE_DEBUG) {
    console.log('formData');
    console.log(formData);
  }

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

  if (import.meta.env.VITE_DEBUG) {
    console.log('formData');
    console.log(formData);
  }

  const authToken = await fetch(endpoint, {
    method: 'POST',
    body: formData
  });

  return authToken.json();
}
