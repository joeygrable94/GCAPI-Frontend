import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { ssrFetchWebsitesList } from '~/entities/websites';

const WebsitesActionsMenu = clientOnly(
  () => import('~/entities/websites/ui/action-menu')
);
const WebsitesDataTable = clientOnly(
  () => import('~/widgets/data-tables/websites-table')
);

export const route = {
  load({ location }) {
    void ssrFetchWebsitesList(
      +location.query.page || 1,
      +location.query.size || 10,
      location.query.clientId || null
    );
  }
} satisfies RouteDefinition;

export default function Websites(props: RouteSectionProps) {
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
}
