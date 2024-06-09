import { RouteDefinition, createAsync, useParams } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { ssrFetchClientById } from '~/entities/clients';

const WebsitesDataTable = clientOnly(
  () => import('~/widgets/data-tables/websites-table')
);

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
      <h1 class="my-2">Client {data()?.title}</h1>
      <WebsitesDataTable initialData={undefined} clientId={params.id} />
    </main>
  );
}
