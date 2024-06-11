import { RouteDefinition, createAsync } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { ssrFetchCurrentUser } from '~/entities/users';

const UserProfileCard = clientOnly(() => import('~/entities/users/ui/profile-card'));

export const route = {
  async load() {
    const currentUser = await ssrFetchCurrentUser();
    return { currentUser };
  }
} satisfies RouteDefinition;

export default function UserProfile() {
  const data = createAsync(() => ssrFetchCurrentUser());

  return (
    <main>
      <UserProfileCard initialData={data()} />
    </main>
  );
}
