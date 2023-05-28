// @refresh reload
import { Auth0 } from '@afroze9/solid-auth0';
import { Suspense } from 'solid-js';
import {
  A,
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
import { ThemeContext, ThemeDefault } from '~/features';
import './root.scss';

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Auth0
              domain={import.meta.env.VITE_AUTH0_DOMAIN}
              clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
              audience={import.meta.env.VITE_AUTH0_AUDIENCE}
              logoutRedirectUri={import.meta.env.VITE_AUTH0_REDIRECT_URI}
              loginRedirectUri={`${import.meta.env.VITE_BASE_URL}/`}
              scope={import.meta.env.VITE_AUTH0_SCOPES}
            >
              <ThemeContext>
                <ThemeDefault>
                  <A href="/">Index</A>
                  <A href="/about">About</A>
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </ThemeDefault>
              </ThemeContext>
            </Auth0>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
