import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { Show } from 'solid-js';
import { ssrFetchWebsitesList } from '~/entities/websites';

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
      <Show when={data() !== undefined}>
        <pre>{JSON.stringify(data(), null, 2)}</pre>
      </Show>
      {/* <WebsitesActionsMenu /> */}
      {/* <WebsitesDataTable initialData={data()} clientId={clientId()} /> */}
    </main>
  );
}
