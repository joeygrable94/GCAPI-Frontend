import { RouteDefinition, createAsync } from '@solidjs/router';
import { Component, Show, createEffect, createSignal } from 'solid-js';
import { UserProfileCard, getCurrentUserOrLogin } from '~/entities/users';
import { AuthorizedUser } from '~/features/auth';

export const route = {
  load: () => getCurrentUserOrLogin()
} satisfies RouteDefinition;

const Profile: Component = () => {
  const data = createAsync<AuthorizedUser>(() => getCurrentUserOrLogin());
  const [user, setUser] = createSignal<AuthorizedUser | undefined>(data());
  createEffect(() => setUser(data()));
  return (
    <main>
      <Show when={user() !== undefined}>
        <UserProfileCard user={user() as AuthorizedUser} />
      </Show>
    </main>
  );
};

export default Profile;
