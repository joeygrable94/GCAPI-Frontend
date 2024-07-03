import { getSession } from '@solid-mediakit/auth';
import { createMiddleware } from '@solidjs/start/middleware';
import { authOptions } from '~/providers/auth';

export default createMiddleware({
  onRequest: [
    async function (event) {
      console.log('REQUEST.URL', event.request.url);
      const session = await getSession(event.request, authOptions);
      event.locals.accessToken = session?.accessToken;
    }
  ]
});
