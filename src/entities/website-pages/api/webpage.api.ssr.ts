import { cache } from '@solidjs/router';
import { getUserSessionApiToken } from '~/providers/auth';
import { Paginated_WebsitePageRead_, WebsitePagesService } from '~/shared/api';
import { defaultPagination } from '~/shared/tanstack';
import { logError } from '~/shared/utils';

/**
 * @summary Fetches a list of website pages on the server.
 */
export const ssrFetchWebsitePagesList = cache(
  async (
    page: number,
    size: number,
    websiteId: string | null,
    sitemapId: string | null
  ) => {
    'use server';
    let pages: Paginated_WebsitePageRead_ =
      defaultPagination<Paginated_WebsitePageRead_>(page, size);
    try {
      await getUserSessionApiToken();
      pages = await WebsitePagesService.websitePagesListApiV1WebpagesGet({
        page: page,
        size: size,
        websiteId: websiteId,
        sitemapId: sitemapId
      });
    } catch (err: Error | unknown) {
      logError('Error fetching website pages list:', err);
    }
    return pages;
  },
  'ssrFetchWebsitePagesList'
);
