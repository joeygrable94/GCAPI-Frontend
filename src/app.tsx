// @refresh reload
import { SessionProvider } from '@solid-mediakit/auth/client';
import { MetaProvider } from '@solidjs/meta';
import { Router, createAsync } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { FileRoutes } from '@solidjs/start/router';
import { QueryClientProvider } from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import { ErrorBoundary, Suspense } from 'solid-js';
import { Toaster } from 'solid-toast';
import '~/app.scss';
import { AuthProvider, getUserSessionApiToken } from '~/providers/auth';
import { ThemeProvider } from '~/providers/theme';
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
              <Suspense>
                <ErrorBoundary fallback={<>Session Provider Error</>}>
                  <SessionProvider>
                    <Suspense>
                      <ErrorBoundary fallback={<>Auth Provider Error</>}>
                        <AuthProvider
                          accessToken={session()?.accessToken}
                          refreshToken={session()?.refreshToken}
                          expires={session()?.expires}
                        >
                          <Suspense>
                            <ErrorBoundary fallback={<>Theme Provider Error</>}>
                              <ThemeProvider>
                                <Suspense>
                                  <ErrorBoundary fallback={<>Route Children Error</>}>
                                    <PrimaryNavigation />
                                    <div class="container mx-auto">
                                      {props.children}
                                    </div>
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
