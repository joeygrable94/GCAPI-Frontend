import { createMiddleware } from '@solidjs/start/middleware';

export default createMiddleware({
  onRequest: [
    async (event) => {
      console.log('ON REQUEST', event.request.url);
    }
  ],
  onBeforeResponse: [
    async (event, { body }) => {
      console.log('BEFORE RESPONSE', event.request.url);
    }
  ]
});
