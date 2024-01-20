import { createHandler } from '@solidjs/start/entry';
import { StartServer } from '@solidjs/start/server';
import { defineRequestMiddleware, defineResponseMiddleware } from 'vinxi/server';

export default createHandler(
  () => (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app" class="viewport-height">
              {children}
            </div>
            {scripts}
          </body>
        </html>
      )}
    />
  ),
  {
    onRequest: [
      defineRequestMiddleware(async (event) => {
        const id = Math.random().toString();
        console.time(`request ${id} ${event.path}`);
        (event as any).id = id;
      })
    ],
    onBeforeResponse: [
      defineResponseMiddleware(async (event) => {
        console.timeEnd(`request ${(event as any).id} ${event.path}`);
      })
    ]
  }
);
