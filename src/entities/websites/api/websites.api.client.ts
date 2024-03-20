import {
  ApiError,
  Paginated_WebsiteRead_,
  WebsiteRead,
  WebsitesService
} from '~/shared/api';
import { defaultPagination } from '~/shared/tanstack';
import { logError } from '~/shared/utils';

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
    logError('Error fetching websites list:', err.message);
    return defaultPagination<Paginated_WebsiteRead_>(page, size);
  }
}

/**
 * @summary Fetches a website by ID on the client.
 */
export async function fetchWebsiteById<QueryFunction>(
  queryContext: any
): Promise<WebsiteRead | undefined> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0];
  const websiteId = queryKey[1];
  try {
    const response = await WebsitesService.websitesReadApiV1WebsitesWebsiteIdGet({
      websiteId
    });
    return response;
  } catch (err: ApiError | Error | any) {
    logError('Error fetching website:', err.message);
    return undefined;
  }
}
