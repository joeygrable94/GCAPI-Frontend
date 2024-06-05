import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { Show } from 'solid-js';
import { ssrFetchClientsList } from '~/entities/clients';

export const route = {
  load({ location }) {
    void ssrFetchClientsList(+location.query.page || 1, +location.query.size || 10);
  }
} satisfies RouteDefinition;

export default function Clients(props: RouteSectionProps) {
  const page = () => +props.location.query.page || 1;
  const size = () => +props.location.query.page || 10;
  const data = createAsync(() => ssrFetchClientsList(page(), size()));
  return (
    <main>
      <h1 class="my-2">Clients</h1>
      {/* <ClientsActionsMenu /> */}
      {/* <ClientsDataTable initialData={data()} /> */}
      <Show when={data() !== undefined}>
        <pre>{JSON.stringify(data(), null, 2)}</pre>
      </Show>
    </main>
  );
}
