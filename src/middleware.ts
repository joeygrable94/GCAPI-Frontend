import { createMiddleware } from '@solidjs/start/middleware';
import { getSession } from './shared/server/session';

export default createMiddleware({
  onRequest: [
    async (event) => {
      const session = await getSession();
      console.log('ON REQUEST', event.request.url, session.id);
    }
  ],
  onBeforeResponse: [
    async (event, { body }) => {
      const session = await getSession();
      console.log('BEFORE RESPONSE', event.request.url, session.id);
    }
  ]
});
