// @refresh reload
import { Link, MetaProvider, Title } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start';
import { ErrorBoundary, Suspense, onMount } from 'solid-js';
import { Toaster } from 'solid-toast';
import { AuthProvider } from '~/providers/auth';
import { useCookieConfig } from '~/providers/cookie';
import { MainLayout } from '~/providers/layout';
import { QueryProvider } from '~/providers/tanstack-query';
import '~/shared/sass/index.scss';
import { viewportHeightStyles } from '~/shared/utils';

export default function App() {
  const cookies = useCookieConfig();
  onMount(() => viewportHeightStyles());
  return (
    <QueryProvider>
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
                  <ErrorBoundary fallback={<>Main Layout Error</>}>
                    <MainLayout darkMode={cookies.darkMode}>
                      <Suspense>
                        <ErrorBoundary fallback={<>Page Route Error</>}>
                          {props.children}
                        </ErrorBoundary>
                      </Suspense>
                      <Toaster position="bottom-right" />
                    </MainLayout>
                  </ErrorBoundary>
                </Suspense>
              </MetaProvider>
            );
          }}
        >
          <FileRoutes />
        </Router>
      </AuthProvider>
    </QueryProvider>
  );
}
