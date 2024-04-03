import { createMiddleware } from '@solidjs/start/middleware';
import { getCookie } from 'vinxi/http';
import { AuthConfig, defaultAuthConfig } from './features/auth';
import { OpenAPI } from './shared/api';

export default createMiddleware({
  onRequest: [
    async (event) => {
      const path = event.request.url;
      console.log('ON REQUEST', event.request.url);
      const cookie: string | undefined = getCookie('gcapi_auth');
      if (cookie && !path.includes('/login')) {
        const parsed: AuthConfig = cookie ? JSON.parse(cookie) : defaultAuthConfig;
        OpenAPI.TOKEN = await parsed.accessToken;
      }
    }
  ],
  onBeforeResponse: [
    async (event, { body }) => {
      console.log('BEFORE RESPONSE', event.request.url);
    }
  ]
});
