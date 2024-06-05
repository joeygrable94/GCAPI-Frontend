import { StartServer, createHandler } from '@solidjs/start/server';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      return (
        <html lang="en" data-bs-theme={'light'}>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body data-bs-theme={'light'}>
            <div id="app" class="viewport-height" data-bs-theme={'light'}>
              {children}
            </div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
