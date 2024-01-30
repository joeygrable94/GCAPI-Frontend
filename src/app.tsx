import { Link, MetaProvider, Title } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import { ErrorBoundary, Suspense, onMount } from 'solid-js';
import { isServer } from 'solid-js/web';
import { Toaster } from 'solid-toast';
import { AuthConfig, AuthProvider, MainLayout, useAuthCookie } from '~/components';
import '~/sass/index.scss';
import { viewportHeightStyles } from '~/utils';

function useCookieConfig(): { auth: AuthConfig } {
  const authCookie = useAuthCookie();
  return {
    auth: authCookie
  };
}

export default function App() {
  const cookies = useCookieConfig();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 5000
      }
    }
  });
  onMount(() => (!isServer ? viewportHeightStyles() : undefined));
  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
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
              <Suspense>
                <ErrorBoundary fallback={<>Auth0 Error</>}>
                  <MetaProvider>
                    <Title>GCAPI</Title>
                    <Link
                      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                      rel="stylesheet"
                      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                      crossorigin="anonymous"
                    />
                    <ErrorBoundary fallback={<>Main Layout Error</>}>
                      <MainLayout>
                        <Suspense>
                          <ErrorBoundary fallback={<>Page Route Error</>}>
                            {props.children}
                          </ErrorBoundary>
                        </Suspense>
                        <Toaster position="bottom-right" />
                      </MainLayout>
                    </ErrorBoundary>
                  </MetaProvider>
                </ErrorBoundary>
              </Suspense>
            );
          }}
        >
          <FileRoutes />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
