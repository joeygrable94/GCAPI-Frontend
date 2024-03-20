import {
  ApiError,
  Paginated_WebsiteMapRead_,
  WebsiteSitemapsService
} from '~/shared/api';
import { defaultPagination } from '~/shared/tanstack';
import { logError } from '~/shared/utils';

/**
 * @summary Fetches a list of website sitemaps on the client.
 */
export async function fetchWebsiteSitemapsList<QueryFunction>(
  queryContext: any
): Promise<Paginated_WebsiteMapRead_> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0];
  const page = queryKey[1];
  const size = queryKey[2];
  const websiteId = queryKey[3];
  const sitemapId = queryKey[4];
  try {
    const response = await WebsiteSitemapsService.websiteSitemapsListApiV1SitemapsGet({
      page: page,
      size: size,
      websiteId: websiteId,
      sitemapId: sitemapId
    });
    return response;
  } catch (err: ApiError | Error | any) {
    logError('Error fetching sitemap list:', err.message);
    return defaultPagination<Paginated_WebsiteMapRead_>(page, size);
  }
}
