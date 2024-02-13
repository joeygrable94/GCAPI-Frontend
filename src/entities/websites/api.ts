import { cache } from '@solidjs/router';
import { getRequestEvent } from 'solid-js/web';
import { parseCookies } from 'vinxi/http';
import { AuthConfig, defaultAuthConfig } from '~/providers/auth';
import {
  ApiError,
  OpenAPI,
  Paginated_WebsiteRead_,
  WebsitesService
} from '~/shared/api';
import { defaultPagination } from '~/shared/lib/tanstack-query';
import { logError } from '~/shared/utils';

/**
 * @summary Fetches a list of websites on the server.
 */
export const ssrFetchWebsitesList = cache(
  async (page: number = 1, size: number = 10, clientId: string | null) => {
    'use server';
    let websites: Paginated_WebsiteRead_ = defaultPagination;
    try {
      const event = getRequestEvent();
      const cookies = parseCookies(event!);
      const parsed: AuthConfig = cookies['gcapi_auth']
        ? JSON.parse(cookies['gcapi_auth'])
        : defaultAuthConfig;
      OpenAPI.TOKEN = await parsed.accessToken;
      websites = await WebsitesService.websitesListApiV1WebsitesGet({
        page: page,
        size: size,
        clientId: clientId
      });
    } catch (err: ApiError | Error | any) {
      logError('Error fetching websites list:', err.message);
    }
    return websites;
  },
  'ssrFetchWebsitesList'
);

/**
 * @summary Fetches a list of websites on the client.
 */
export async function fetchWebsitesList<QueryFunction>(
  queryContext: any
): Promise<Paginated_WebsiteRead_> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0];
  const page = queryKey[1];
  const size = queryKey[2];
  const clientId = queryKey[3];
  try {
    const response = await WebsitesService.websitesListApiV1WebsitesGet({
      page: page,
      size: size,
      clientId: clientId
    });
    return response;
  } catch (err: ApiError | Error | any) {
    logError('Error fetching users list:', err.message);
    return defaultPagination;
  }
}
