import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { ClientsActionsMenu, ssrFetchClientsList } from '~/entities/clients';
import { ClientsDataTable } from '~/widgets/data-tables';

export const route = {
  load({ location, params }) {
    void ssrFetchClientsList(+location.query.page || 1, +location.query.size || 10);
  }
} satisfies RouteDefinition;

const Clients = (props: RouteSectionProps) => {
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
};

export default Clients;
