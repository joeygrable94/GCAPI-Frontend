import { useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import Navigation from '~/lib/components/Navigation';
import { checkUserPermissionsOrRedirect } from '~/lib/db/useUser';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const user = await checkUserPermissionsOrRedirect(request);
    return { user };
  });
}

export default function UsersMe() {
  const data: any = useRouteData<typeof routeData>();

  return (
    <>
      <Navigation />
      <main>
        <p>
          {data()?.user.id}
          <br />
          {data()?.user.email}
          <br />
          {data()?.user.is_active ? 'active' : 'inactive'}
          <br />
          {data()?.user.is_verified ? 'verified' : 'unverified'}
          <br />
          {data()?.user.is_superuser ? 'superuser' : 'user'}
        </p>
      </main>
    </>
  );
}
