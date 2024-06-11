import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { ssrFetchClientsList } from '~/entities/clients';

const ClientsActionsMenu = clientOnly(
  () => import('~/entities/clients/ui/action-menu')
);
const ClientsDataTable = clientOnly(
  () => import('~/widgets/data-tables/clients-table')
);

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
      <ClientsActionsMenu />
      <ClientsDataTable initialData={data()} />
    </main>
  );
}
