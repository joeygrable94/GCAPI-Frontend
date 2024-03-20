import { cache } from '@solidjs/router';
import { AuthConfig, defaultAuthConfig } from '~/features/auth';
import { getServerCookie } from '~/features/cookie/session.server';
import {
  ApiError,
  OpenAPI,
  Paginated_WebsiteMapRead_,
  WebsiteSitemapsService
} from '~/shared/api';
import { defaultPagination } from '~/shared/tanstack';
import { logError } from '~/shared/utils';

/**
 * @summary Fetches a list of websites on the server.
 */
export const ssrFetchWebsiteSitemapsList = cache(
  async (
    page: number,
    size: number,
    websiteId: string | null,
    sitemapId: string | null
  ) => {
    'use server';
    let sitemaps: Paginated_WebsiteMapRead_ =
      defaultPagination<Paginated_WebsiteMapRead_>(page, size);
    try {
      const cookie = getServerCookie('gcapi_auth');
      const parsed: AuthConfig = cookie ? JSON.parse(cookie) : defaultAuthConfig;
      OpenAPI.TOKEN = await parsed.accessToken;
      sitemaps = await WebsiteSitemapsService.websiteSitemapsListApiV1SitemapsGet({
        page: page,
        size: size,
        websiteId: websiteId,
        sitemapId: sitemapId
      });
    } catch (err: ApiError | Error | any) {
      logError('Error fetching sitemaps list:', err.message);
    }
    return sitemaps;
  },
  'ssrFetchWebsiteSitemapsList'
);
