import { useParams, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { useStore } from '~/lib/core/store';
import { log } from '~/lib/core/utils';
import { belongsToUserOrIsSuperUserOrRedirect } from '~/lib/db/useUser';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const params: any = useParams();
    const user: any = await belongsToUserOrIsSuperUserOrRedirect(
      request,
      params.id
    );
    return { user };
  });
}

export default function UsersMe() {
  const data: any = useRouteData<typeof routeData>();
  const params: any = useParams();
  const [state, actions]: any = useStore();
  log(`User ID: ${params.id}`);

  return (
    <>
      <main>
        <h1>User By ID</h1>
        <p>Fetch User {params.id}</p>
      </main>
    </>
  );
}
