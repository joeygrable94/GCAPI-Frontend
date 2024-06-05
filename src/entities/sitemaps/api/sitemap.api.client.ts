import { QueryFunctionContext } from '@tanstack/solid-query';
import { Paginated_WebsiteMapRead_, WebsiteSitemapsService } from '~/shared/api';
import { defaultPagination } from '~/shared/tanstack';
import { logError } from '~/shared/utils';

/**
 * @summary Fetches a list of website sitemaps on the client.
 */
export async function fetchWebsiteSitemapsList(
  queryContext: QueryFunctionContext
): Promise<Paginated_WebsiteMapRead_> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0];
  const page = queryKey[1] as number;
  const size = queryKey[2] as number;
  const websiteId = queryKey[3] as string;
  const sitemapId = queryKey[4] as string;
  try {
    const response = await WebsiteSitemapsService.websiteSitemapsListApiV1SitemapsGet({
      page: page,
      size: size,
      websiteId: websiteId,
      sitemapId: sitemapId
    });
    return response;
  } catch (err: Error | unknown) {
    logError('Error fetching sitemap list:', _key, err);
    return defaultPagination<Paginated_WebsiteMapRead_>(page, size);
  }
}
