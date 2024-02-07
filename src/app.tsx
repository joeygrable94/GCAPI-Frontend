// @refresh reload
import { Link, MetaProvider, Title } from '@solidjs/meta';
import { RouteDefinition, Router, createAsync } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start';
import { ErrorBoundary, Suspense, onMount } from 'solid-js';
import { isServer } from 'solid-js/web';
import { Toaster } from 'solid-toast';
import { AuthProvider, CurrentUser, defaultGuestUser } from '~/providers/auth';
import { useCookieConfig } from '~/providers/cookie';
import { MainLayout } from '~/providers/layout';
import { QueryProvider } from '~/providers/tanstack-query';
import { UserProvider, getCurrentUserOrGuest } from '~/providers/user';
import '~/shared/sass/index.scss';
import { viewportHeightStyles } from '~/shared/utils';

export const route = {
  load: () => {
    void getCurrentUserOrGuest();
  }
} satisfies RouteDefinition;

export default function App() {
  const cookies = useCookieConfig();
  onMount(() => (!isServer ? viewportHeightStyles() : undefined));
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
            const user = createAsync<CurrentUser>(getCurrentUserOrGuest);
            return (
              <UserProvider initialUser={user() || defaultGuestUser}>
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
                      <MainLayout
                        user={user() || defaultGuestUser}
                        darkMode={cookies.darkMode}
                      >
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
              </UserProvider>
            );
          }}
        >
          <FileRoutes />
        </Router>
      </AuthProvider>
    </QueryProvider>
  );
}
