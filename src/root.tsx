// @refresh reload
import { ColorModeScript, HopeProvider, injectCriticalStyle } from '@hope-ui/core';
import { Suspense, useContext } from 'solid-js';
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
import StoreProvider from '~/lib/core/state';
import { theme } from '~/lib/theme';
import './root.css';

export default function Root() {
  const event: any = useContext(ServerContext);
  // const themeStorage = cookieStorageManagerSSR(
  //   isServer ? event.request.headers.get('cookie') ?? '' : document.cookie
  // );

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
          <StoreProvider>
            <Suspense>
              <ErrorBoundary>
                <Routes>
                  <FileRoutes />
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </StoreProvider>
        </HopeProvider>
        <Scripts />
      </Body>
    </Html>
  );
}
