import { Title, useRouteData } from 'solid-start';
import { createServerData$, HttpStatusCode } from 'solid-start/server';
import Navigation from '~/lib/components/Navigation';
import { checkUserPermissionsOrRedirect } from '~/lib/db/useUser';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const user = await checkUserPermissionsOrRedirect(request);
    return { user };
  });
}

export default function NotFound() {
  const data: any = useRouteData<typeof routeData>();

  return (
    <>
      <Navigation />
      <main>
        <Title>Not Found</Title>
        <HttpStatusCode code={404} />
        <h1>Page Not Found</h1>
      </main>
    </>
  );
}
