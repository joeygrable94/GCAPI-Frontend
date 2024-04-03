import auth0, { WebAuth } from 'auth0-js';

export async function webAuthLogout(config: auth0.AuthOptions, logoutUrl: string) {
  'use client';
  const webAuth: WebAuth = new auth0.WebAuth(config);
  return await webAuth.logout({
    returnTo: logoutUrl,
    clientID: config.clientID
  });
}

export async function webAuthAuthorize(config: auth0.AuthOptions, scopes: string[]) {
  'use client';
  const webAuth: WebAuth = new auth0.WebAuth(config);
  return await webAuth.authorize({ scope: scopes.join(' ') });
}
