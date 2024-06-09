import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { Show } from 'solid-js';
import { ssrFetchUserById } from '~/entities/users';
import { UserRead } from '~/shared/api';

const UserProfileCard = clientOnly(() => import('~/entities/users/ui/profile-card'));

export const route = {
  load({ params }) {
    void ssrFetchUserById(params.id);
  }
} satisfies RouteDefinition;

export default function UserById(props: RouteSectionProps) {
  const userId = () => props.params.id;
  const data = createAsync(() => ssrFetchUserById(userId()));
  return (
    <main>
      <Show when={data() !== undefined}>
        <UserProfileCard user={data() as UserRead} />
      </Show>
    </main>
  );
}
