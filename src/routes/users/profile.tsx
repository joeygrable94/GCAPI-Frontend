import { RouteDefinition, createAsync } from '@solidjs/router';
import { Component, Show, createEffect, createSignal } from 'solid-js';
import { UserProfileCard } from '~/entities/users/ui';
import { AuthorizedUser } from '~/providers/auth';
import { getCurrentUserOrLogin } from '~/providers/user';

export const route = {
  load: () => getCurrentUserOrLogin()
} satisfies RouteDefinition;

const Profile: Component = () => {
  const data = createAsync<AuthorizedUser>(getCurrentUserOrLogin);
  const [user, setUser] = createSignal<AuthorizedUser | undefined>(data());
  createEffect(() => setUser(data()));
  return (
    <main>
      <Show when={user() !== undefined}>
        <UserProfileCard user={user()!} />
      </Show>
    </main>
  );
};

export default Profile;
