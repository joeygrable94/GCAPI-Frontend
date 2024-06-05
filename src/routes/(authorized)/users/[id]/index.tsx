import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { Show } from 'solid-js';
import { ssrFetchUserById } from '~/entities/users';

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
        <pre>{JSON.stringify(data(), null, 2)}</pre>
        {/* <UserProfileCard user={data()!} /> */}
      </Show>
    </main>
  );
}
