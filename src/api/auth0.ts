import auth0 from 'auth0-js';

export const logoutUrl = `${import.meta.env.VITE_APP_BASE_URL}/auth/logout`;

const webAuth0Config: auth0.AuthOptions = {
  _sendTelemetry: false,
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  redirectUri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
  responseType: 'code'
};

export const webAuthn = new auth0.WebAuth(webAuth0Config);
