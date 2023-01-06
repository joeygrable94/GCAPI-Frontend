import { Outlet, useRouteData } from 'solid-start';
import { createServerData$, redirect } from 'solid-start/server';
import Navigation from '~/lib/components/Navigation';
import { getUser } from '~/lib/db/session';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const user: any = await getUser(request);
    if (!user) throw redirect('/login');
    return { user };
  });
}

export default function HomeLayout(props: any) {
  const data: any = useRouteData<typeof routeData>();

  return (
    <>
      <Navigation currentUser={data} />
      <Outlet />
    </>
  );
}
