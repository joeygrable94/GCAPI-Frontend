import { onMount, Resource, Show } from 'solid-js';
import {
  RouteDataArgs,
  Title,
  useNavigate,
  useParams,
  useRouteData
} from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { UserRead } from '~/api';
import { CheckAuthorized } from '~/lib/auth/types';
import {
  initialRouteAuthState,
  returnAuthorizedSuperUserOrBelongsToUserOrRedirect,
  returnFetchUserByKey
} from '~/lib/auth/useAuth';
import ProfileInfo from '~/lib/components/Profile';

import { log } from '~/lib/core/utils';

export function routeData({ params }: RouteDataArgs) {
  const authorized: Resource<CheckAuthorized> = createServerData$(
    returnAuthorizedSuperUserOrBelongsToUserOrRedirect,
    {
      key: () => [params.id],
      initialValue: initialRouteAuthState
    }
  );
  const user: Resource<UserRead | boolean> = createServerData$(returnFetchUserByKey, {
    key: () => [params.id],
    initialValue: false
  });
  return { authorized, user };
}

export default function UserById() {
  const params: any = useParams();
  const { authorized, user }: any = useRouteData<typeof routeData>();
  const navigate = useNavigate();

  if (!user()) {
    if (import.meta.env.DEV) log('user not found');
    navigate('/users');
  }

  if (import.meta.env.DEV && !import.meta.env.SSR) log(`<UserById: ${params.id}>`);
  return (
    <>
      <Title>User By Id</Title>
      <main>
        <h1>Fetech User By ID</h1>
        <Show when={user()}>
          <ProfileInfo user={user()} />
        </Show>
      </main>
    </>
  );
}
