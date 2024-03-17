// @refresh reload
import { Link, MetaProvider, Title } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { QueryClientProvider } from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import { Container } from 'solid-bootstrap';
import { ErrorBoundary, Suspense, onMount } from 'solid-js';
import { isServer } from 'solid-js/web';
import { Toaster } from 'solid-toast';
import { AuthProvider } from '~/features/auth';
import { useClientCookieConfig } from '~/features/cookie/config.client';
import { useServerCookieConfig } from '~/features/cookie/config.server';
import { ThemeProvider } from '~/features/theme';
import '~/shared/sass/index.scss';
import { queryClient } from '~/shared/tanstack';
import { viewportHeightStyles } from '~/shared/utils';
import '~/shared/utils/viewport-height/viewport-height.css';
import { PrimaryNavigation } from '~/widgets/navigation';

export default function App() {
  const cookies = isServer ? useServerCookieConfig() : useClientCookieConfig();
  onMount(() => viewportHeightStyles());
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        initialAuth={cookies.auth}
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        audience={import.meta.env.VITE_AUTH0_AUDIENCE}
        redirectUri={import.meta.env.VITE_AUTH0_REDIRECT_URI}
        logoutUrl={import.meta.env.VITE_AUTH0_LOGOUT_URL}
        organization={{
          id: import.meta.env.VITE_AUTH0_ORGANIZATION_ID,
          name: import.meta.env.VITE_AUTH0_ORGANIZATION
        }}
      >
        <Router
          root={(props) => {
            return (
              <MetaProvider>
                <Title>GCAPI</Title>
                <Link
                  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                  rel="stylesheet"
                  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                  crossorigin="anonymous"
                />
                <Suspense>
                  <ErrorBoundary fallback={<>Theme Provider Error</>}>
                    <ThemeProvider darkMode={cookies.darkMode}>
                      <Suspense fallback={<div>Loading...</div>}>
                        <ErrorBoundary fallback={<>Primary Navigation Error</>}>
                          <PrimaryNavigation darkMode={cookies.darkMode} />
                        </ErrorBoundary>
                      </Suspense>
                      <Suspense fallback={<div>Loading...</div>}>
                        <ErrorBoundary fallback={<>Route Children Error</>}>
                          <Container>{props.children}</Container>
                        </ErrorBoundary>
                      </Suspense>
                    </ThemeProvider>
                    <Toaster position="bottom-right" />
                  </ErrorBoundary>
                </Suspense>
              </MetaProvider>
            );
          }}
        >
          <FileRoutes />
        </Router>
      </AuthProvider>
      <SolidQueryDevtools />
    </QueryClientProvider>
  );
}
