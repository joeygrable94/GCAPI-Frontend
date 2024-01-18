import { Link, MetaProvider, Title } from '@solidjs/meta';
import { Route, Router } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import { Suspense, lazy, onMount } from 'solid-js';
import { Toaster } from 'solid-toast';
import { MainLayout } from '~/components';
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
          );
        }}
      >
        <Route path="/" component={lazy(() => import('./routes/index'))} />
        <Route path="/login" component={lazy(() => import('./routes/login'))} />
        <Route path="/register" component={lazy(() => import('./routes/register'))} />
      </Router>
    </QueryClientProvider>
  );
}
