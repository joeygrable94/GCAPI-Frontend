import { RouteDefinition, createAsync } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { Show } from 'solid-js';
import { ssrFetchCurrentUser } from '~/entities/users';
import { UserRead } from '~/shared/api';

const UserProfileCard = clientOnly(() => import('~/entities/users/ui/profile-card'));

export const route = {
  load() {
    void ssrFetchCurrentUser();
  }
} satisfies RouteDefinition;

export default function UserProfile() {
  const data = createAsync(() => ssrFetchCurrentUser());

  return (
    <main>
      <Show when={data() !== undefined}>
        <UserProfileCard user={data() as UserRead} />
      </Show>
    </main>
  );
}
