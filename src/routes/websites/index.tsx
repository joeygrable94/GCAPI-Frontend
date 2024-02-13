import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { ssrFetchClientsList } from '~/entities/clients';
import { ssrFetchWebsitesList } from '~/entities/websites';
import { ActionsMenuWebsites } from '~/features/websites';
import { WebsitesDataTable } from '~/widgets/websites';

export const route = {
  load({ location, params }) {
    void ssrFetchClientsList(+location.query.page || 1, +location.query.size || 10);
  }
} satisfies RouteDefinition;

const Websites = (props: RouteSectionProps) => {
  const page = () => +props.location.query.page || 1;
  const size = () => +props.location.query.page || 10;
  const clientId = () => +props.location.query.clientId || null;
  const data = createAsync(() => ssrFetchWebsitesList(page(), size(), null));
  return (
    <main>
      <h1 class="my-2">Websites</h1>
      <ActionsMenuWebsites />
      <WebsitesDataTable initialData={data()} />
    </main>
  );
};

export default Websites;
