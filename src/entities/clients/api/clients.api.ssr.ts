import { cache, redirect } from '@solidjs/router';
import { AuthConfig, defaultAuthConfig } from '~/features/auth';
import { getServerCookie } from '~/features/cookie/session.server';
import {
  ApiError,
  ClientRead,
  ClientsService,
  OpenAPI,
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
    const cookie = getServerCookie('gcapi_auth');
    const parsed: AuthConfig = cookie ? JSON.parse(cookie) : defaultAuthConfig;
    OpenAPI.TOKEN = await parsed.accessToken;
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
    const cookie = getServerCookie('gcapi_auth');
    const parsed: AuthConfig = cookie ? JSON.parse(cookie) : defaultAuthConfig;
    OpenAPI.TOKEN = await parsed.accessToken;
    client = await ClientsService.clientsReadApiV1ClientsClientIdGet({ clientId: id });
  } catch (err: ApiError | Error | any) {
    logError('Error fetching client:', err.message);
    throw redirect('/404');
  }
  return client;
}, 'ssrFetchClientById');
