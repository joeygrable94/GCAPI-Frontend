import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { Show } from 'solid-js';
import { ssrFetchUsersList } from '~/entities/users';

export const route = {
  load({ location }) {
    void ssrFetchUsersList(+location.query.page || 1, +location.query.size || 10);
  }
} satisfies RouteDefinition;

export default function UserList(props: RouteSectionProps) {
  const page = () => +props.location.query.page || 1;
  const size = () => +props.location.query.page || 10;
  const data = createAsync(() => ssrFetchUsersList(page(), size()));
  return (
    <main>
      <h1 class="my-2">Users</h1>
      <Show when={data() !== undefined}>
        <pre>{JSON.stringify(data(), null, 2)}</pre>
      </Show>
      {/* <UsersDataTable initialData={data()} /> */}
    </main>
  );
}
