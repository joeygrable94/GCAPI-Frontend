import { useParams, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import Navigation from '~/lib/components/Navigation';
import { useStore } from '~/lib/core/store';
import { checkSuperUserPermissionsOrRedirect } from '~/lib/db/useUser';
import { log } from '~/lib/core/utils';

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
