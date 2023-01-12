import { Resource, Show } from 'solid-js';
import { RouteDataArgs, Title, useParams, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { UserRead, UsersService } from '~/api';
import { CheckAuthorized } from '~/lib/auth/types';
import { getAuthorizedSuperUserOrBelongsToUser } from '~/lib/auth/useAuth';
import ProfileInfo from '~/lib/components/Profile';

import { log } from '~/lib/core/utils';

export function routeData({ params }: RouteDataArgs) {
  const authorized: Resource<CheckAuthorized> = createServerData$(
    async (key, { request }) => {
      try {
        const authorized: CheckAuthorized = await getAuthorizedSuperUserOrBelongsToUser(
          request,
          key[0]
        );
        return authorized;
      } catch (error: any) {
        if (import.meta.env.DEV) log(error?.body);
      }
      return { user: false, access: false } as CheckAuthorized;
    },
    {
      key: () => [params.id],
      initialValue: { user: false, access: false }
    }
  );
  const user: Resource<UserRead | boolean> = createServerData$(
    async (key) => {
      try {
        const found: UserRead = await UsersService.usersUserApiV1UsersIdGet({
          id: key[0]
        });
        return found;
      } catch (error: any) {
        if (import.meta.env.DEV) log(error?.body);
      }
      return false;
    },
    {
      key: () => [params.id],
      initialValue: false
    }
  );
  return { authorized, user };
}

export default function UserById() {
  const params: any = useParams();
  const { authorized, user }: any = useRouteData<typeof routeData>();

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
