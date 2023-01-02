// @refresh reload
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
import StoreProvider from '~/core/store';
import { OpenAPI } from './api';
import { API_URL_BASE } from '~/core/utils';
import './root.css';

// set open api settings
OpenAPI.BASE = API_URL_BASE;

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <StoreProvider>
              <Routes>
                <FileRoutes />
              </Routes>
            </StoreProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
