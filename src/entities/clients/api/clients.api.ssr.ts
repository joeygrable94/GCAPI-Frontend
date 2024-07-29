import { cache, redirect } from '@solidjs/router';
import { getRequestEvent } from 'solid-js/web';
import { ClientRead, ClientsService, Paginated_ClientRead_ } from '~/shared/api';
import { logError, setOpenApiToken } from '~/shared/utils';

/**
 * @summary Fetches a list of clients on the server.
 */
export const ssrFetchClientsList = cache(async (page: number, size: number) => {
  'use server';
  let clients: Paginated_ClientRead_ = {
    total: 0,
    page: page,
    size: size,
    results: []
  };
  try {
    const event = getRequestEvent();
    setOpenApiToken('server', event?.locals.accessToken);
    clients = await ClientsService.clientsListApiV1ClientsGet({
      page,
      size
    });
  } catch (err: Error | unknown) {
    logError('Error fetching clients list:', err);
  }
  return clients;
}, 'ssrFetchClientsList');

/**
 * @summary Fetches a client by ID on the server.
 */
export const ssrFetchClientById = cache(async (id: string) => {
  'use server';
  let client: ClientRead | undefined = undefined;
  try {
    const event = getRequestEvent();
    setOpenApiToken('server', event?.locals.accessToken);
    client = await ClientsService.clientsReadApiV1ClientsClientIdGet({ clientId: id });
  } catch (err: Error | unknown) {
    logError('Error fetching client:', err);
  }
  if (client === undefined) {
    return redirect('/404');
  }
  return client;
}, 'ssrFetchClientById');
