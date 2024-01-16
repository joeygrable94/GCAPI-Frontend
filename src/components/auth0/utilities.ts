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
