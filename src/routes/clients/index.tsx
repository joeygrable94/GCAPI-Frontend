import { RouteDefinition, createAsync } from '@solidjs/router';
import { Component } from 'solid-js';
import { ClientsDataTable, listClients } from '~/components';

export const route = {
  load: () => listClients()
} satisfies RouteDefinition;

const Clients: Component = () => {
  const data = createAsync(listClients);
  return (
    <main>
      <h1>Clients</h1>
      <ClientsDataTable data={data()?.results} />
    </main>
  );
};

export default Clients;
