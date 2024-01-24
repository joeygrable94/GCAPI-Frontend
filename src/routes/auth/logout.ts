import { APIEvent } from '@solidjs/start/server';
// import { storage } from '../session.js'

export default async function GET(event: APIEvent) {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const headers = new Headers();
  // const session = await storage.getSession()
  headers.append('Content-Type', 'text/html; charset=utf-8');
  // headers.append('Set-Cookie', await storage.destroySession(session))

  console.log('Auth0 logout');
  console.log('event.request.url', event.request.url);

  const body = `<html>
  <head>
    <meta http-equiv="refresh" content="0; url=${baseUrl}" />
  </head>
  <body></body>
</html>`;

  return new Response(body, { headers });
}
