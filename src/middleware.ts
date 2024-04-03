import { createMiddleware } from '@solidjs/start/middleware';
import { getCookie } from 'vinxi/http';

export default createMiddleware({
  onRequest: [
    async (event) => {
      console.log('ON REQUEST', event.request.url);
      const cookie = getCookie('gcapi_auth');
      console.log('cookie', cookie);
      // const parsed: AuthConfig = cookie ? JSON.parse(cookie) : defaultAuthConfig;
      // OpenAPI.TOKEN = await parsed.accessToken;
    }
  ],
  onBeforeResponse: [
    async (event, { body }) => {
      console.log('BEFORE RESPONSE', event.request.url);
    }
  ]
});
