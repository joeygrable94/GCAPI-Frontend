import {
  ApiError,
  Paginated_WebsitePageRead_,
  WebsitePagesService
} from '~/shared/api';
import { defaultPagination } from '~/shared/tanstack';
import { logError } from '~/shared/utils';

/**
 * @summary Fetches a list of website pages on the client.
 */
export async function fetchWebsitePagesList<QueryFunction>(
  queryContext: any
): Promise<Paginated_WebsitePageRead_> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0];
  const page = queryKey[1];
  const size = queryKey[2];
  const websiteId = queryKey[3];
  const sitemapId = queryKey[4];
  try {
    const response = await WebsitePagesService.websitePagesListApiV1WebpagesGet({
      page: page,
      size: size,
      websiteId: websiteId,
      sitemapId: sitemapId
    });
    return response;
  } catch (err: ApiError | Error | any) {
    logError('Error fetching website pages list:', err.message);
    return defaultPagination<Paginated_WebsitePageRead_>(page, size);
  }
}
