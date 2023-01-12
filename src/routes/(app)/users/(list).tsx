import { createMemo, For, Resource } from 'solid-js';
import { A, RouteDataArgs, Title, useParams, useRouteData } from 'solid-start';
import { createServerData$, redirect } from 'solid-start/server';
import { ApiError, UserRead, UsersService } from '~/api';
import { CheckAuthorized } from '~/lib/auth/types';
import { getAuthorizedSuperUser } from '~/lib/auth/useAuth';
import { isAuthorized } from '~/lib/auth/utilities';
import { log } from '~/lib/core/utils';

export function routeData({ params }: RouteDataArgs) {
  const authorized: Resource<CheckAuthorized> = createServerData$(
    async (_, { request }) => {
      const authorized: CheckAuthorized = await getAuthorizedSuperUser(request);
      if (isAuthorized(authorized) && !authorized?.user.is_superuser)
        throw redirect('/');
      return authorized;
    },
    {
      initialValue: { user: false, access: false }
    }
  );
  const page: number = parseInt(params.page) > 0 ? parseInt(params.page) : 1;
  const users: Resource<UserRead[] | null[]> = createServerData$(
    async (key) => {
      try {
        const users: UserRead[] | null[] =
          await UsersService.usersListUsersApiV1UsersGet({ page: key[0] });
        return users;
      } catch (error: ApiError | any) {
        log(error?.body);
        return [];
      }
    },
    {
      key: () => [page],
      initialValue: []
    }
  );
  return { authorized, users };
}

export default function UsersIndex() {
  const { authorized, users }: any = useRouteData<typeof routeData>();
  const params: any = useParams();

  if (import.meta.env.DEV && !import.meta.env.SSR) log('<UsersIndex>');
  return (
    <>
      <Title>Users</Title>
      <main>
        <h1>All Users</h1>
        <p>Index: list all users</p>
        <ul class="todo-list">
          <For each={users()}>
            {(user: UserRead) => {
              const linkUserId = createMemo(() => `/users/${user.id}`);
              return (
                <li>
                  <A href={linkUserId()}>{user.email}</A>
                </li>
              );
            }}
          </For>
        </ul>
      </main>
    </>
  );
}
