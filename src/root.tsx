// @refresh reload
import { ColorModeScript, HopeProvider, injectCriticalStyle } from '@hope-ui/core';
import { Suspense } from 'solid-js';
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title
} from 'solid-start';
import StoreProvider from '~/lib/core/state';
import './root.css';

export default function Root() {
  injectCriticalStyle();

  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <StoreProvider>
          <ColorModeScript />
          <HopeProvider>
            <Suspense>
              <ErrorBoundary>
                <Routes>
                  <FileRoutes />
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </HopeProvider>
        </StoreProvider>
        <Scripts />
      </Body>
    </Html>
  );
}
