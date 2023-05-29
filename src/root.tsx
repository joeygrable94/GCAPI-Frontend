// @refresh reload
import { Suspense } from 'solid-js';
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
  Title
} from 'solid-start';
import { Navigation, ThemeDefault, ThemeProvider } from '~/features';
import './root.scss';

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <ThemeProvider>
              <ThemeDefault>
                <Navigation />
                <Routes>
                  <FileRoutes />
                </Routes>
              </ThemeDefault>
            </ThemeProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
