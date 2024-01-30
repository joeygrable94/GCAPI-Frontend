import { cache } from '@solidjs/router';
import { getRequestEvent } from 'solid-js/web';
import { getCookie } from 'vinxi/server';
import { ApiError, ClientsService, OpenAPI, Paginated_ClientRead_ } from '~/backend';
import { AuthConfig, defaultAuthConfig } from '~/components';
import { error } from '~/utils';

export const listClients = cache(async (page: number = 1, size: number = 10) => {
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
    // let currentUser = await UsersService.usersCurrentApiV1UsersMeGet();
    clients = await ClientsService.clientsListApiV1ClientsGet({
      page,
      size
    });
  } catch (err: ApiError | Error | any) {
    error('Error fetching clients list:', err.message);
  }
  return clients;
}, 'listClients');
