import { RouteDefinition, createAsync, useParams } from '@solidjs/router';
import { Component } from 'solid-js';
import { ssrFetchClientById } from '~/entities/clients';
import { WebsitesDataTable } from '~/entities/websites/ui';

export const route = {
  load({ params }) {
    void ssrFetchClientById(params.id);
  }
} satisfies RouteDefinition;

const ClientById: Component = () => {
  const params = useParams();
  const data = createAsync(() => ssrFetchClientById(params.id));
  return (
    <main>
      <h1 class="my-2">Client {data()?.title}</h1>
      <pre>{JSON.stringify(data(), null, 2)}</pre>
      <WebsitesDataTable initialData={undefined} clientId={params.id} />
    </main>
  );
};

export default ClientById;
