import { Link, MetaProvider, Title } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import { Suspense, onMount } from 'solid-js';
import { Toaster } from 'solid-toast';
import { Counter, CounterProvider, MainLayout } from '~/components';
import './sass/index.scss';
import { viewportHeightStyles } from './utils';
import './utils/height-fix/viewport-height.css';

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
              <Title>GC Inc</Title>
              <Link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                crossorigin="anonymous"
              />
              <CounterProvider initialCount={10}>
                <MainLayout>
                  <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
                </MainLayout>
                <Counter />
              </CounterProvider>
            </MetaProvider>
          );
        }}
      >
        <FileRoutes />
      </Router>
    </QueryClientProvider>
  );
}
