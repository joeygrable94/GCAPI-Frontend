import { useParams, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import Navigation from '~/lib/components/Navigation';
import { belongsToUserOrIsSuperUserOrRedirect } from '~/lib/db/session';

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
  const params: any = useParams();
  const data: any = useRouteData<typeof routeData>();

  return (
    <>
      <Navigation />
      <main>
        <p>Fetch User {params.id}</p>
      </main>
    </>
  );
}
