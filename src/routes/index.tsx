import { Show } from 'solid-js';
import { Title, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import Counter from '~/lib/components/Counter';
import Navigation from '~/lib/components/Navigation';
import { checkUserPermissionsOrRedirect } from '~/lib/db/useUser';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const user = await checkUserPermissionsOrRedirect(request);
    return { user };
  });
}

export default function Home() {
  const data: any = useRouteData<typeof routeData>();

  return (
    <>
      <Navigation />
      <main>
        <Show
          when={data()?.user.id}
          fallback={
            <>
              <Title>Hello World</Title>
              <h1>Hello there!</h1>
            </>
          }
        >
          <>
            <Title>Hello {data()?.user.email}</Title>
            <h1>Hello, {data()?.user.email}!</h1>
          </>
        </Show>
        <h2>Welcome to GCAPI.</h2>
        <Counter />
      </main>
    </>
  );
}
