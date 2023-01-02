import { Resource, Show } from 'solid-js';
import { Title, useRouteData } from 'solid-start';
import { createServerData$, redirect } from 'solid-start/server';
import { UserRead } from '~/api';
import Counter from '~/components/Counter';
import Navigation from '~/components/Navigation';
import { getUser } from '~/core/session';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const user = await getUser(request);

    if (!user) {
      throw redirect('/login');
    }

    return user;
  });
}

export default function Home() {
  const user: any = useRouteData<typeof routeData>();

  return (
    <>
      <Navigation currentUser={user} />
      <main>
        <Show
          when={user()?.id}
          fallback={
            <>
              <Title>Hello World</Title>
              <h1>Hello there!</h1>
            </>
          }
        >
          <>
            <Title>Hello {user()?.email}</Title>
            <h1>Hello, {user()?.email}!</h1>
          </>
        </Show>
        <h2>Welcome to GCAPI.</h2>
        <Counter />
      </main>
    </>
  );
}
