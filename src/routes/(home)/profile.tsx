import { useParams, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { useStore } from '~/lib/core/store';
import { log } from '~/lib/core/utils';
import { getCurrentUser } from '~/lib/db/useUser';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const user = await getCurrentUser(request);
    return { user };
  });
}

export default function UserProfileMain() {
  const data: any = useRouteData<typeof routeData>();
  const params: any = useParams();
  const [state, actions]: any = useStore();
  log('Current User Profile');

  return (
    <main>
      <h1>Current User Profile</h1>
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
  );
}
