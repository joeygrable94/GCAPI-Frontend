/**
 * @summary Refreshes the access token using the refresh token
 *
 * @param refreshToken string of the refresh token to be used to refresh the access token
 * @returns json object containing the new access token and refresh token
 */
export default async function refresh(refreshToken: string) {
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
