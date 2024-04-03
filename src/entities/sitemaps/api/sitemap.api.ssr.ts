import { cache } from '@solidjs/router';
import {
  ApiError,
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
