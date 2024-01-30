import { RouteDefinition, createAsync, useParams } from '@solidjs/router';
import { Component } from 'solid-js';
import { listClients } from '~/components';

export const route = {
  load: () => listClients()
} satisfies RouteDefinition;

const ClientById: Component = () => {
  const params = useParams();
  const data = createAsync(listClients);
  return (
    <main>
      <h1>Client by ID {params.id}</h1>
    </main>
  );
};

export default ClientById;
