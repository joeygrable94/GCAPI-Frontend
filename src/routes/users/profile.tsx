import { RouteDefinition, createAsync } from '@solidjs/router';
import { Container } from 'solid-bootstrap';
import { Component, Show, createEffect, createSignal } from 'solid-js';
import { AuthorizedUser } from '~/providers/auth';
import { getCurrentUserOrLogin, isGuest, useUser } from '~/providers/user';
import { UserProfileCard } from '~/widgets/users';

export const route = {
  load: () => getCurrentUserOrLogin()
} satisfies RouteDefinition;

const Profile: Component = () => {
  const data = createAsync<AuthorizedUser>(getCurrentUserOrLogin);
  const [userState, userAct] = useUser();
  const [user, setUser] = createSignal<AuthorizedUser | undefined>(data());
  createEffect(() => {
    if (!isGuest(userState.user)) {
      setUser(userState.user as AuthorizedUser);
    }
  });
  return (
    <main>
      <Container>
        <Show when={user() !== undefined}>
          <UserProfileCard user={user()!} />
        </Show>
      </Container>
    </main>
  );
};

export default Profile;
