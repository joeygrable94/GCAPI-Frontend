import { RouteDefinition, createAsync } from '@solidjs/router';
import { Show } from 'solid-js';
import { ssrFetchCurrentUser } from '~/entities/users';

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
        <pre>{JSON.stringify(data(), null, 2)}</pre>
        {/* <UserProfileCard user={data() as AuthorizedUser} /> */}
      </Show>
    </main>
  );
}
