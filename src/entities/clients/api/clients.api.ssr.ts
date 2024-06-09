import { cache } from '@solidjs/router';
import { getUserSessionApiToken } from '~/providers/auth';
import { ClientRead, ClientsService, Paginated_ClientRead_ } from '~/shared/api';
import { logError } from '~/shared/utils';

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
    await getUserSessionApiToken();
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
    await getUserSessionApiToken();
    client = await ClientsService.clientsReadApiV1ClientsClientIdGet({ clientId: id });
  } catch (err: Error | unknown) {
    logError('Error fetching client:', err);
  }
  return client;
}, 'ssrFetchClientById');
