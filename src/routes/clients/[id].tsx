import { Title } from '@solidjs/meta';
import { A, useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { Component, Match, Show, Switch } from 'solid-js';
import { ClientRead, ClientsService } from '~/backend';

const ClientById: Component = () => {
  const params = useParams();
  const client = createQuery(() => ({
    queryKey: ['clientById', params.id],
    queryFn: async (): Promise<ClientRead> => {
      const client = await ClientsService.clientsReadApiV1ClientsClientIdGet({
        clientId: params.id
      });
      return client;
    }
  }));

  return (
    <>
      <Title>GCAPI Clients</Title>
      <Switch>
        <Match when={client.isPending}>
          <p>Loading Clients</p>
        </Match>
        <Match when={client.isError}>
          <p>Error Loading Clients: {client.error?.message}</p>
        </Match>
        <Match when={client.isSuccess}>
          <Show when={client.data !== undefined}>
            <p>
              {client.data?.title}
              <br />
              {client.data?.description}
              <br />
              {client.data?.id}
            </p>
            <p>
              Back to all <A href="/clients">Clients</A>
            </p>
          </Show>
        </Match>
      </Switch>
    </>
  );
};

export default ClientById;
