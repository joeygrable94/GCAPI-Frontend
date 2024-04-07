import { RouteDefinition, createAsync, useParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import { UserProfileCard, ssrFetchUserById } from '~/entities/users';

export const route = {
  load({ params }) {
    void ssrFetchUserById(params.id);
  }
} satisfies RouteDefinition;

const UserById: Component = () => {
  const params = useParams();
  const data = createAsync(() => ssrFetchUserById(params.id));
  return (
    <main>
      <Show when={data() !== undefined}>
        <UserProfileCard user={data()!} />
      </Show>
    </main>
  );
};

export default UserById;
