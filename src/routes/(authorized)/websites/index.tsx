import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { WebsitesActionsMenu, ssrFetchWebsitesList } from '~/entities/websites';
import { WebsitesDataTable } from '~/widgets/data-tables';

export const route = {
  load({ location, params }) {
    void ssrFetchWebsitesList(
      +location.query.page || 1,
      +location.query.size || 10,
      location.query.clientId || null
    );
  }
} satisfies RouteDefinition;

const Websites = (props: RouteSectionProps) => {
  const page = () => +props.location.query.page || 1;
  const size = () => +props.location.query.page || 10;
  const clientId = () => props.location.query.clientId || null;
  const data = createAsync(() => ssrFetchWebsitesList(page(), size(), clientId()));
  return (
    <main>
      <h1 class="my-2">Websites</h1>
      <WebsitesActionsMenu />
      <WebsitesDataTable initialData={data()} clientId={clientId()} />
    </main>
  );
};

export default Websites;
