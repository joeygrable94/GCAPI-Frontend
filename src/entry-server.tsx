import { StartServer, createHandler } from '@solidjs/start/server';
import { useServerCookieConfig } from '~/providers/cookie/config.server';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const cookies = useServerCookieConfig();
      return (
        <html lang="en" data-bs-theme={cookies.darkMode ? 'dark' : 'light'}>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body data-bs-theme={cookies.darkMode ? 'dark' : 'light'}>
            <div
              id="app"
              class="viewport-height"
              data-bs-theme={cookies.darkMode ? 'dark' : 'light'}
            >
              {children}
            </div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
