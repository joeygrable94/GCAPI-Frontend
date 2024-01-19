import { Link, MetaProvider, Title } from '@solidjs/meta';
import { Route, Router } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import { ErrorBoundary, Suspense, lazy, onMount } from 'solid-js';
import { Toaster } from 'solid-toast';
import { Auth0, MainLayout } from '~/components';
import { viewportHeightStyles } from './utils';

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 5000
      }
    }
  });
  onMount(() => {
    viewportHeightStyles();
  });
  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <Toaster position="bottom-right" />
      <Router
        root={(props) => {
          return (
            <Suspense>
              <ErrorBoundary fallback={<>Error Page</>}>
                <Auth0
                  domain={import.meta.env.VITE_AUTH0_DOMAIN}
                  clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
                  audience={import.meta.env.VITE_AUTH0_AUDIENCE}
                  redirectUri={import.meta.env.VITE_AUTH0_REDIRECT_URI}
                  logoutUrl={import.meta.env.VITE_AUTH0_LOGOUT_URL}
                  organization={{ id: import.meta.env.VITE_AUTH0_ORGANIZATION_ID }}
                >
                  <MetaProvider>
                    <Title>GCAPI</Title>
                    <Link
                      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                      rel="stylesheet"
                      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                      crossorigin="anonymous"
                    />
                    <MainLayout>
                      <Suspense>{props.children}</Suspense>
                    </MainLayout>
                  </MetaProvider>
                </Auth0>
              </ErrorBoundary>
            </Suspense>
          );
        }}
      >
        <Route path="/" component={lazy(() => import('./routes/index'))} />
        <Route path="/authorize" component={lazy(() => import('./routes/authorize'))} />
      </Router>
    </QueryClientProvider>
  );
}
