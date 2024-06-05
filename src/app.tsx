// @refresh reload
import { SessionProvider } from '@solid-mediakit/auth/client';
import { Link, MetaProvider } from '@solidjs/meta';
import { Router, createAsync } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { FileRoutes } from '@solidjs/start/router';
import { QueryClientProvider } from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import { Container } from 'solid-bootstrap';
import { ErrorBoundary, Suspense } from 'solid-js';
import { Toaster } from 'solid-toast';
import { AuthProvider, getUserSessionApiToken } from '~/providers/auth';
import { ThemeProvider } from '~/providers/theme';
import '~/shared/sass/index.scss';
import { queryClient } from '~/shared/tanstack';
const PrimaryNavigation = clientOnly(() => import('~/widgets/navigation/primary'));

export const route = {
  load: () => getUserSessionApiToken()
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router
        root={(props) => {
          const session = createAsync(() => getUserSessionApiToken());
          return (
            <MetaProvider>
              <Link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                crossorigin="anonymous"
              />
              <Suspense>
                <ErrorBoundary fallback={<>Session Provider Error</>}>
                  <SessionProvider>
                    <Suspense>
                      <ErrorBoundary fallback={<>Auth Provider Error</>}>
                        <AuthProvider
                          accessToken={session()?.accessToken}
                          refreshToken={session()?.refreshToken}
                          expiresAt={session()?.expires}
                        >
                          <Suspense>
                            <ErrorBoundary fallback={<>Theme Provider Error</>}>
                              <ThemeProvider>
                                <Suspense>
                                  <ErrorBoundary
                                    fallback={<>Primary Navigation Error</>}
                                  >
                                    <PrimaryNavigation />
                                  </ErrorBoundary>
                                </Suspense>
                                <Suspense>
                                  <ErrorBoundary fallback={<>Route Children Error</>}>
                                    <Container>{props.children}</Container>
                                  </ErrorBoundary>
                                </Suspense>
                                <Toaster position="bottom-right" />
                              </ThemeProvider>
                            </ErrorBoundary>
                          </Suspense>
                        </AuthProvider>
                      </ErrorBoundary>
                    </Suspense>
                  </SessionProvider>
                </ErrorBoundary>
              </Suspense>
            </MetaProvider>
          );
        }}
      >
        <FileRoutes />
      </Router>
      <SolidQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
