import { cache, redirect } from '@solidjs/router';
import { AuthConfig, defaultAuthConfig } from '~/features/auth';
import { getServerCookie } from '~/features/cookie/session.server';
import {
  ApiError,
  OpenAPI,
  Paginated_WebsiteRead_,
  WebsiteRead,
  WebsitesService
} from '~/shared/api';
import { defaultPagination } from '~/shared/tanstack';
import { logError } from '~/shared/utils';

/**
 * @summary Fetches a list of websites on the server.
 */
export const ssrFetchWebsitesList = cache(
  async (page: number, size: number, clientId: string | null) => {
    'use server';
    let websites: Paginated_WebsiteRead_ = defaultPagination<Paginated_WebsiteRead_>(
      page,
      size
    );
    try {
      const cookie = getServerCookie('gcapi_auth');
      const parsed: AuthConfig = cookie ? JSON.parse(cookie) : defaultAuthConfig;
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
 * @summary Fetches a website by ID on the server.
 */
export const ssrFetchWebsiteById = cache(async (id: string) => {
  'use server';
  let website: WebsiteRead;
  try {
    const cookie = getServerCookie('gcapi_auth');
    const parsed: AuthConfig = cookie ? JSON.parse(cookie) : defaultAuthConfig;
    OpenAPI.TOKEN = await parsed.accessToken;
    website = await WebsitesService.websitesReadApiV1WebsitesWebsiteIdGet({
      websiteId: id
    });
  } catch (err: ApiError | Error | any) {
    logError('Error fetching website:', err.message);
    throw redirect('/404');
  }
  return website;
}, 'ssrFetchWebsiteById');
