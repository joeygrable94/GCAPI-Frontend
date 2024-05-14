import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { Show } from 'solid-js';
import { getCurrentUserOrLogin } from '~/entities/users';
import { AuthorizedUser, UserProvider, useAuth0 } from '~/features/auth';

export const route = {
  load: () => getCurrentUserOrLogin()
} satisfies RouteDefinition;

export default function (props: RouteSectionProps) {
  const user = createAsync<AuthorizedUser>(() => getCurrentUserOrLogin());
  const [_, authAct] = useAuth0();

  return (
    <Show when={authAct.isInitialized() && authAct.isAuthenticated() && user()}>
      <UserProvider initialUser={user()!}>{props.children}</UserProvider>
    </Show>
  );
}
