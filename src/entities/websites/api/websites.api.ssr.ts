import { cache, redirect } from '@solidjs/router';
import { getRequestEvent } from 'solid-js/web';
import { Paginated_WebsiteRead_, WebsiteRead, WebsitesService } from '~/shared/api';
import { defaultPagination } from '~/shared/tanstack';
import { logError, setOpenApiToken } from '~/shared/utils';

/**
 * @summary Fetches a list of websites on the server.
 */
export const ssrFetchWebsitesList = cache(
  async (page: number, size: number, clientId: string | null) => {
    'use server';
    console.log('ssrFetchWebsitesList');
    let websites: Paginated_WebsiteRead_ = defaultPagination<Paginated_WebsiteRead_>(
      page,
      size
    );
    try {
      const event = getRequestEvent();
      setOpenApiToken('server', event?.locals.accessToken);
      websites = await WebsitesService.websitesListApiV1WebsitesGet({
        page: page,
        size: size,
        clientId: clientId
      });
    } catch (err: Error | unknown) {
      logError('Error fetching websites list:', err);
    }
    return websites;
  },
  'ssrFetchWebsitesList'
);

/**
 * @summary Fetches a website by ID on the server.
 */
export const ssrFetchWebsiteById = cache(async (id: string) => {
  'use server';
  let website: WebsiteRead | undefined = undefined;
  try {
    const event = getRequestEvent();
    setOpenApiToken('server', event?.locals.accessToken);
    website = await WebsitesService.websitesReadApiV1WebsitesWebsiteIdGet({
      websiteId: id
    });
  } catch (err: Error | unknown) {
    logError('Error fetching website:', err);
  }
  if (website === undefined) {
    return redirect('/404');
  }
  return website;
}, 'ssrFetchWebsiteById');
