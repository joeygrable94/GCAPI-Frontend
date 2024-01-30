import { Title } from '@solidjs/meta';
import { useLocation } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import {
  Component,
  ErrorBoundary,
  Match,
  Suspense,
  Switch,
  createSignal
} from 'solid-js';
import { ClientsService } from '~/backend';
import { ClientsDataTable } from '~/components';

const ClientsList: Component = () => {
  const loc = useLocation();
  const [page, setPage] = createSignal<number>(parseInt(loc.query.page) || 1);
  const clients = createQuery(() => ({
    queryKey: ['/clients', page()],
    queryFn: async () => {
      const clients = await ClientsService.clientsListApiV1ClientsGet({ page: page() });
      return clients.results;
    }
  }));

  return (
    <>
      <Title>GCAPI Clients</Title>
      <main class="py-5">
        <Suspense>
          <ErrorBoundary fallback={<>Query Error</>}>
            <Switch>
              <Match when={clients.isPending}>
                <p>Loading Clients</p>
              </Match>
              <Match when={clients.isError}>
                <p>Error Loading Clients: {clients.error?.message}</p>
              </Match>
              <Match when={clients.isSuccess}>
                <ClientsDataTable data={clients.data} />
              </Match>
            </Switch>
          </ErrorBoundary>
        </Suspense>
      </main>
    </>
  );
};

export default ClientsList;
