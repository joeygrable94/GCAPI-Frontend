// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
  document={({ assets, children, scripts }) => {
      return (
        <html lang="en" data-theme={'light'}>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body data-theme={'light'}>
            <div id="app" data-theme={'light'}>
              {children}
            </div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
