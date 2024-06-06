import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { Show } from 'solid-js';
import { UserProfileCard, ssrFetchUserById } from '~/entities/users';
import { AuthorizedUser } from '~/providers/auth';

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
        <UserProfileCard user={data() as AuthorizedUser} />
      </Show>
    </main>
  );
}
