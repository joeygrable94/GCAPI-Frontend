import auth0 from 'auth0-js';

export const auth0Client = new auth0.WebAuth({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  redirectUri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  scope: import.meta.env.VITE_AUTH0_SCOPE,
  responseType: 'token id_token'
});

/*
import axios from 'axios';
var options = {
  method: 'POST',
  url: 'https://{yourDomain}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: new URLSearchParams({
    grant_type: 'password',
    username: '{username}',
    password: '{password}',
    audience: '{yourApiIdentifier}',
    scope: 'read:sample',
    client_id: '{yourClientId}',
    client_secret: '{yourClientSecret}'
  })
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
*/
