import { createMemo, For, Resource } from 'solid-js';
import { A, RouteDataArgs, Title, useParams, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { UserRead } from '~/api';
import { CheckAuthorized } from '~/lib/auth/types';
import {
  initialRouteAuthState,
  returnAuthorizedSuperUserOrRedirect,
  returnFetchUsersListByKey
} from '~/lib/auth/useAuth';
import { log } from '~/lib/core/utils';

export function routeData({ params }: RouteDataArgs) {
  const authorized: Resource<CheckAuthorized> = createServerData$(
    returnAuthorizedSuperUserOrRedirect,
    { initialValue: initialRouteAuthState }
  );
  const page: number = parseInt(params.page) > 0 ? parseInt(params.page) : 1;
  const users: Resource<UserRead[] | null[]> = createServerData$(
    returnFetchUsersListByKey,
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
