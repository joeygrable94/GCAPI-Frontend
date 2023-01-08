import { Resource, Show } from 'solid-js';
import { RouteDataArgs, useParams, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { UserRead, UsersService } from '~/api';
import { Authorized } from '~/lib/auth/session';
import { belongsToUserOrIsSuperUserOrRedirect } from '~/lib/auth/useUser';
import ProfileInfo from '~/lib/components/Profile';
import { log } from '~/lib/core/utils';

export function routeData({ params }: RouteDataArgs) {
  const authorized: Resource<Authorized | undefined> = createServerData$(
    async (key, { request }) => {
      try {
        const authorized: Authorized | null =
          await belongsToUserOrIsSuperUserOrRedirect(request, key[0]);
        return authorized;
      } catch (error: any) {
        if (import.meta.env.DEV) log(error?.body);
      }
    },
    {
      key: () => [params.id],
      initialValue: undefined
    }
  );
  const user: Resource<UserRead | undefined> = createServerData$(
    async (key) => {
      try {
        const found: UserRead = await UsersService.usersUserApiV1UsersIdGet({
          id: key[0]
        });
        return found;
      } catch (error: any) {
        if (import.meta.env.DEV) log(error?.body);
      }
    },
    {
      key: () => [params.id],
      initialValue: undefined
    }
  );
  return { authorized, user };
}

export default function UserById() {
  const params: any = useParams();
  const { authorized, user }: any = useRouteData<typeof routeData>();

  if (import.meta.env.DEV && !import.meta.env.SSR)
    log(`<UserById: ${params.id}>`);
  return (
    <>
      <main>
        <h1>Fetech User By ID</h1>
        <Show when={user()}>
          <ProfileInfo user={user()} />
        </Show>
      </main>
    </>
  );
}
