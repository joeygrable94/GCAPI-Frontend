import { getSession } from '@solid-mediakit/auth';
import { createMiddleware } from '@solidjs/start/middleware';
import { getWebRequest } from 'vinxi/http';
import { authOptions } from './providers/auth';
import { OpenAPI } from './shared/api';

export default createMiddleware({
  onRequest: [
    async (event) => {
      console.log('GLOBAL', event.request.url);
      try {
        const request = getWebRequest();
        const session = await getSession(request, authOptions);
        if (session) {
          OpenAPI.TOKEN = session.accessToken;
        }
      } catch (error) {
        console.error('GLOBAL', error);
      }
    }
  ]
});
