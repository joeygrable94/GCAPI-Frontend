import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { Show } from 'solid-js';
import { CurrentUser, useAuth0 } from '~/features/auth';
import { getCurrentUserOrLogin } from '~/features/user';

export const route = {
  load: () => getCurrentUserOrLogin()
} satisfies RouteDefinition;

export default function (props: RouteSectionProps) {
  const user = createAsync<CurrentUser>(() => getCurrentUserOrLogin());
  const [_, AuthActions] = useAuth0();

  return (
    <Show when={AuthActions.isAuthenticated() && user()}>
      <h1>Welcome {user()?.username}.</h1>
      {props.children}
    </Show>
  );
}
