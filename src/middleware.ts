import { createMiddleware } from '@solidjs/start/middleware';
import { setOpenAPISessionToken } from './features/session';
import { OpenAPI } from './shared/api';
import { log } from './shared/utils';

export default createMiddleware({
  onRequest: [
    async (event) => {
      const path = event.request.url;
      if (import.meta.env.VITE_DEBUG === 'true') log('ON REQUEST', path);
      await setOpenAPISessionToken();
      if (import.meta.env.VITE_DEBUG === 'true')
        log('SESSION TOKEN', OpenAPI.TOKEN?.length);
    }
  ],
  onBeforeResponse: [
    async (event, { body }) => {
      const path = event.request.url;
      if (import.meta.env.VITE_DEBUG === 'true') log('BEFORE RESPONSE', path);
    }
  ]
});
