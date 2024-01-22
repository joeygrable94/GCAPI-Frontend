import { Title } from '@solidjs/meta';
import { A, useLocation } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import {
  Component,
  ErrorBoundary,
  For,
  Match,
  Suspense,
  Switch,
  createSignal
} from 'solid-js';
import { ClientsService } from '~/backend';

const Clients: Component = () => {
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
              <For each={clients.data}>
                {(client) => (
                  <p>
                    <A href={`/clients/${client.id}`}>{client.title}</A>
                  </p>
                )}
              </For>
            </Match>
          </Switch>
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default Clients;
