import { useParams, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import Navigation from '~/components/Navigation';
import { checkSuperUserPermissionsOrRedirect } from '~/core/session';
import { useStore } from '~/core/store';
import { log } from '~/core/utils';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const user = await checkSuperUserPermissionsOrRedirect(request);
    return { user };
  });
}

export default function Users() {
  const data: any = useRouteData<typeof routeData>();
  const params: any = useParams();
  const [state, actions]: any = useStore();
  log(state);
  log(params.page);

  return (
    <>
      <Navigation />
      <main>
        <p>Users</p>
      </main>
    </>
  );
}
