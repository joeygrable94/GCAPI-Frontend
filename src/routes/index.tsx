import { RouteDefinition, createAsync } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import {
  AdminRole,
  GuestRole,
  ManagerRole,
  PermissionRequired,
  SuperAdminRole,
  UserRole
} from '~/features/auth/permission';
import { CurrentUser } from '~/providers/auth';
import { getCurrentUserOrLogin } from '~/providers/user';

export const route = {
  load: () => getCurrentUserOrLogin()
} satisfies RouteDefinition;

const Home: Component = () => {
  const data = createAsync<CurrentUser>(getCurrentUserOrLogin);
  return (
    <main>
      <h1 class="my-2">GCAPI Auth0 Secured Backend</h1>
      <Show when={data()}>
        <p>Welcome {data()?.username}.</p>
        <PermissionRequired>
          <SuperAdminRole>
            <h3>Hello Super Admin</h3>
          </SuperAdminRole>
          <AdminRole>
            <h3>Hello Admin</h3>
          </AdminRole>
          <ManagerRole>
            <h3>Hello Manager</h3>
          </ManagerRole>
          <UserRole>
            <h3>Hello User</h3>
          </UserRole>
          <GuestRole>
            <h3>Hello Guest</h3>
          </GuestRole>
        </PermissionRequired>
      </Show>
    </main>
  );
};

export default Home;
