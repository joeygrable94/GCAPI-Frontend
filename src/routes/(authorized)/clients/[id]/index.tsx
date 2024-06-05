import { RouteDefinition, createAsync, useParams } from '@solidjs/router';
import { Show } from 'solid-js';
import { ssrFetchClientById } from '~/entities/clients';

export const route = {
  load({ params }) {
    void ssrFetchClientById(params.id);
  }
} satisfies RouteDefinition;

export default function ClientById() {
  const params = useParams();
  const data = createAsync(() => ssrFetchClientById(params.id));
  return (
    <main>
      <Show when={data() !== undefined}>
        <h1 class="my-2">Client {data()?.title}</h1>
        <pre>{JSON.stringify(data(), null, 2)}</pre>
      </Show>
      {/* <WebsitesDataTable initialData={undefined} clientId={params.id} /> */}
    </main>
  );
}
