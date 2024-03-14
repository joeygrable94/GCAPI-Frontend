import { cache, redirect } from '@solidjs/router';
import { getRequestEvent } from 'solid-js/web';
import { parseCookies } from 'vinxi/http';
import { AuthConfig, defaultAuthConfig } from '~/providers/auth';
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
    const event = getRequestEvent();
    const cookies = parseCookies(event!);
    const parsed: AuthConfig = cookies['gcapi_auth']
      ? JSON.parse(cookies['gcapi_auth'])
      : defaultAuthConfig;
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
    const event = getRequestEvent();
    const cookies = parseCookies(event!);
    const parsed: AuthConfig = cookies['gcapi_auth']
      ? JSON.parse(cookies['gcapi_auth'])
      : defaultAuthConfig;
    OpenAPI.TOKEN = await parsed.accessToken;
    client = await ClientsService.clientsReadApiV1ClientsClientIdGet({ clientId: id });
  } catch (err: ApiError | Error | any) {
    logError('Error fetching client:', err.message);
    throw redirect('/404');
  }
  return client;
}, 'ssrFetchClientById');
