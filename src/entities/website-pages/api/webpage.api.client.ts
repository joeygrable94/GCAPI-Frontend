import { QueryFunctionContext } from '@tanstack/solid-query';
import { Paginated_WebsitePageRead_, WebsitePagesService } from '~/shared/api';
import { defaultPagination } from '~/shared/tanstack';
import { logError } from '~/shared/utils';

/**
 * @summary Fetches a list of website pages on the client.
 */
export async function fetchWebsitePagesList(
  queryContext: QueryFunctionContext
): Promise<Paginated_WebsitePageRead_> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0] as string;
  const page = queryKey[1] as number;
  const size = queryKey[2] as number;
  const websiteId = queryKey[3] as string;
  const sitemapId = queryKey[4] as string;
  try {
    const response = await WebsitePagesService.websitePagesListApiV1WebpagesGet({
      page: page,
      size: size,
      websiteId: websiteId,
      sitemapId: sitemapId
    });
    return response;
  } catch (err: Error | unknown) {
    logError('Error fetching website pages list:', _key, err);
    return defaultPagination<Paginated_WebsitePageRead_>(page, size);
  }
}
