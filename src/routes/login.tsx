import { RouteDefinition, createAsync } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { Component, Show } from 'solid-js';
import { getCurrentUserOrGuest } from '~/entities/users';
import { CurrentUser } from '~/features/auth';
const LoginButton = clientOnly(() => import('~/features/auth/ui/login.button'));

export const route = {
  load: () => getCurrentUserOrGuest()
} satisfies RouteDefinition;

const Login: Component = () => {
  const user = createAsync<CurrentUser>(() => getCurrentUserOrGuest());

  return (
    <main>
      <Show when={user()} fallback={<h1 class="my-2">Please Log In or Register.</h1>}>
        <h1 class="my-2">Please Log In or Register {user()?.username}.</h1>
      </Show>
      <LoginButton />
    </main>
  );
};

export default Login;
