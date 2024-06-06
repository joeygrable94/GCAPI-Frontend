import { RouteDefinition, createAsync } from '@solidjs/router';
import { Show } from 'solid-js';
import { UserProfileCard, ssrFetchCurrentUser } from '~/entities/users';
import { AuthorizedUser } from '~/providers/auth';

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
        <UserProfileCard user={data() as AuthorizedUser} />
      </Show>
    </main>
  );
}
