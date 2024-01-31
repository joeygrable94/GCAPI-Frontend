import { RouteDefinition, createAsync } from '@solidjs/router';
import { Component } from 'solid-js';
import { UsersDataTable, listUsers } from '~/components';

export const route = {
  load: () => listUsers()
} satisfies RouteDefinition;

const Users: Component = () => {
  const data = createAsync(listUsers);
  return (
    <main>
      <h1>Users</h1>
      <UsersDataTable data={data()?.results} />
    </main>
  );
};

export default Users;
