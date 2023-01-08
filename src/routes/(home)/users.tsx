import { Outlet } from 'solid-start';
import { log } from '~/lib/core/utils';

export default function UsersLayout() {
  if (import.meta.env.DEV && !import.meta.env.SSR) log('<UsersLayout>');
  return (
    <>
      <Outlet />
    </>
  );
}
