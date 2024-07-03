import { cache } from '@solidjs/router';
import { getRequestEvent } from 'solid-js/web';
import { Paginated_WebsiteMapRead_, WebsiteSitemapsService } from '~/shared/api';
import { defaultPagination } from '~/shared/tanstack';
import { logError, setOpenApiToken } from '~/shared/utils';

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
      const event = getRequestEvent();
      setOpenApiToken('server', event?.locals.accessToken);
      sitemaps = await WebsiteSitemapsService.websiteSitemapsListApiV1SitemapsGet({
        page: page,
        size: size,
        websiteId: websiteId,
        sitemapId: sitemapId
      });
    } catch (err: Error | unknown) {
      logError('Error fetching sitemaps list:', err);
    }
    return sitemaps;
  },
  'ssrFetchWebsiteSitemapsList'
);
