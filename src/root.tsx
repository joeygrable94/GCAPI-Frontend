// @refresh reload
import {
  ColorModeScript,
  cookieStorageManagerSSR,
  HopeProvider,
  injectCriticalStyle
} from '@hope-ui/core';
import { Suspense, useContext } from 'solid-js';
import { isServer } from 'solid-js/web';
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  ServerContext,
  Title
} from 'solid-start';
import AppProvider from '~/lib/core';
import { theme } from '~/lib/theme';
import './root.scss';

export default function Root() {
  const event: any = useContext(ServerContext);
  const themeStorage = cookieStorageManagerSSR(
    isServer ? event.request.headers.get('cookie') ?? '' : document.cookie
  );

  injectCriticalStyle();

  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <ColorModeScript initialColorMode="light" storageType="cookie" />
        <HopeProvider initialColorMode="light" theme={theme}>
          <AppProvider>
            <Suspense>
              <ErrorBoundary>
                <Routes>
                  <FileRoutes />
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </AppProvider>
        </HopeProvider>
        <Scripts />
      </Body>
    </Html>
  );
}
