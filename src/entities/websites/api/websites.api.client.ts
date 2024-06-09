import { QueryFunctionContext } from '@tanstack/solid-query';
import { Paginated_WebsiteRead_, WebsiteRead, WebsitesService } from '~/shared/api';
import { defaultPagination } from '~/shared/tanstack';
import { logError } from '~/shared/utils';

/**
 * @summary Fetches a list of websites on the client.
 */
export async function fetchWebsitesList(
  queryContext: QueryFunctionContext
): Promise<Paginated_WebsiteRead_> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0] as string;
  const page = queryKey[1] as number;
  const size = queryKey[2] as number;
  const clientId = queryKey[3] as string;
  try {
    const response = await WebsitesService.websitesListApiV1WebsitesGet({
      page: page,
      size: size,
      clientId: clientId
    });
    return response;
  } catch (err: Error | unknown) {
    logError('Error fetching websites list:', _key, err);
    return defaultPagination<Paginated_WebsiteRead_>(page, size);
  }
}

/**
 * @summary Fetches a website by ID on the client.
 */
export async function fetchWebsiteById(
  queryContext: QueryFunctionContext
): Promise<WebsiteRead | undefined> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0] as string;
  const websiteId = queryKey[1] as string;
  try {
    const response = await WebsitesService.websitesReadApiV1WebsitesWebsiteIdGet({
      websiteId
    });
    return response;
  } catch (err: Error | unknown) {
    logError('Error fetching website:', _key, err);
    return undefined;
  }
}
