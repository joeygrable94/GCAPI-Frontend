import { RouteDefinition, createAsync } from '@solidjs/router';
import { Suspense } from 'solid-js';
import { ProfileCard, ssrFetchCurrentUser } from '~/entities/users';

export const route = {
  async load() {
    const currentUser = await ssrFetchCurrentUser();
    return { currentUser };
  }
} satisfies RouteDefinition;

export default function UserProfile() {
  const data = createAsync(() => ssrFetchCurrentUser());

  return (
    <main>
      <Suspense>
        <ProfileCard initialData={data()} />
      </Suspense>
    </main>
  );
}
