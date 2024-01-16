import auth0 from 'auth0-js';

export const auth0Client = new auth0.WebAuth({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  redirectUri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  scope: import.meta.env.VITE_AUTH0_SCOPE,
  responseType: 'token id_token'
});
