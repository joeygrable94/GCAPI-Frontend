import { cache, redirect } from '@solidjs/router';
import {
  ApiError,
  ClientRead,
  ClientsService,
  Paginated_ClientRead_
} from '~/shared/api';
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
    clients = await ClientsService.clientsListApiV1ClientsGet({
      page,
      size
    });
  } catch (err: ApiError | Error | any) {
    logError('Error fetching clients list:', err.message);
  }
  return clients;
}, 'ssrFetchClientsList');

/**
 * @summary Fetches a client by ID on the server.
 */
export const ssrFetchClientById = cache(async (id: string) => {
  'use server';
  let client: ClientRead;
  try {
    client = await ClientsService.clientsReadApiV1ClientsClientIdGet({ clientId: id });
  } catch (err: ApiError | Error | any) {
    logError('Error fetching client:', err.message);
    throw redirect('/404');
  }
  return client;
}, 'ssrFetchClientById');
