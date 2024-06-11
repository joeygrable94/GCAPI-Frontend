import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { ssrFetchUsersList } from '~/entities/users';

const UsersActionsMenu = clientOnly(() => import('~/entities/users/ui/action-menu'));
const UsersDataTable = clientOnly(() => import('~/widgets/data-tables/users-table'));

export const route = {
  async load({ location }) {
    const users = await ssrFetchUsersList(
      +location.query.page || 1,
      +location.query.size || 10
    );
    return { users };
  }
} satisfies RouteDefinition;

export default function UserList(props: RouteSectionProps) {
  const page = () => +props.location.query.page || 1;
  const size = () => +props.location.query.page || 10;
  const data = createAsync(() => ssrFetchUsersList(page(), size()));
  return (
    <main>
      <h1 class="my-2">Users</h1>
      <UsersActionsMenu />
      <UsersDataTable initialData={data()} />
    </main>
  );
}
