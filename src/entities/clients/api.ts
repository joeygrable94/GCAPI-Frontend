import { cache, redirect } from '@solidjs/router';
import { getRequestEvent } from 'solid-js/web';
import { getCookie } from 'vinxi/server';
import { AuthConfig, defaultAuthConfig } from '~/providers/auth';
import {
  ApiError,
  ClientRead,
  ClientsService,
  OpenAPI,
  Paginated_ClientRead_
} from '~/shared/api';
import { defaultPagination } from '~/shared/lib/tanstack-query';
import { logError } from '~/shared/utils';

/**
 * @summary Fetches a list of clients on the server.
 */
export const ssrFetchClientsList = cache(
  async (page: number = 1, size: number = 10) => {
    'use server';
    let clients: Paginated_ClientRead_ = {
      total: 0,
      page: page,
      size: size,
      results: []
    };
    try {
      const cookie = getCookie(getRequestEvent()!, 'gcapi_auth');
      const parsed = JSON.parse(
        cookie ?? JSON.stringify(defaultAuthConfig)
      ) as AuthConfig;
      OpenAPI.TOKEN = parsed.accessToken;
      clients = await ClientsService.clientsListApiV1ClientsGet({
        page,
        size
      });
    } catch (err: ApiError | Error | any) {
      logError('Error fetching clients list:', err.message);
    }
    return clients;
  },
  'ssrFetchClientsList'
);

/**
 * @summary Fetches a list of clients on the client.
 */
export async function fetchClientsList<QueryFunction>(
  queryContext: any
): Promise<Paginated_ClientRead_> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0];
  const page = queryKey[1];
  const size = queryKey[2];
  try {
    const response = await ClientsService.clientsListApiV1ClientsGet({ page, size });
    return response;
  } catch (err: ApiError | Error | any) {
    logError('Error fetching clients list:', err.message);
    return defaultPagination;
  }
}

/**
 * @summary Fetches a client by ID on the server.
 */
export const ssrFetchClientById = cache(async (id: string) => {
  'use server';
  let client: ClientRead;
  try {
    const cookie = getCookie(getRequestEvent()!, 'gcapi_auth');
    const parsed = JSON.parse(
      cookie ?? JSON.stringify(defaultAuthConfig)
    ) as AuthConfig;
    OpenAPI.TOKEN = parsed.accessToken;
    client = await ClientsService.clientsReadApiV1ClientsClientIdGet({ clientId: id });
  } catch (err: ApiError | Error | any) {
    logError('Error fetching client:', err.message);
    throw redirect('/404');
  }
  return client;
}, 'ssrFetchClientById');

/**
 * @summary Fetches a client by ID on the client.
 */
export async function fetchClientById<QueryFunction>(
  queryContext: any
): Promise<ClientRead | undefined> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0];
  const clientId = queryKey[1];
  try {
    const response = await ClientsService.clientsReadApiV1ClientsClientIdGet({
      clientId
    });
    return response;
  } catch (err: ApiError | Error | any) {
    logError('Error fetching client:', err.message);
    return undefined;
  }
}
