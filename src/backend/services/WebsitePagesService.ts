/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paginated_WebsitePageRead_ } from '../models/Paginated_WebsitePageRead_';
import type { WebsitePageCreate } from '../models/WebsitePageCreate';
import type { WebsitePagePSIProcessing } from '../models/WebsitePagePSIProcessing';
import type { WebsitePageRead } from '../models/WebsitePageRead';
import type { WebsitePageUpdate } from '../models/WebsitePageUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebsitePagesService {
  /**
   * Website Pages:List
   * Retrieve a paginated list of website pages.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all website pages
   *
   * `role=client` : only website pages with a website_id associated with the client
   * via `client_website` table
   *
   * `role=employee` : only website pages with a website_id associated with a client's
   * website via `client_website` table, associated with the user via `user_client`
   *
   * Returns:
   * --------
   * `Paginated[WebsitePageRead]` : a paginated list of website pages,
   * optionally filtered
   * @returns Paginated_WebsitePageRead_ Successful Response
   * @throws ApiError
   */
  public static websitePagesListApiV1WebpagesGet({
    page,
    size,
    websiteId,
    sitemapId,
  }: {
    page?: (number | null),
    size?: (number | null),
    websiteId?: (string | null),
    sitemapId?: (string | null),
  }): CancelablePromise<Paginated_WebsitePageRead_> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/webpages/',
      query: {
        'page': page,
        'size': size,
        'website_id': websiteId,
        'sitemap_id': sitemapId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Website Pages:Create
   * Create a new website page.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : create a new website page
   *
   * `role=user` : create a new website page that belongs to a website associated
   * with the client via `client_website` table, associated with the user via the
   * `user_client` table
   *
   * Returns:
   * --------
   * `WebsitePageRead` : the newly created website page
   * @returns WebsitePageRead Successful Response
   * @throws ApiError
   */
  public static websitePagesCreateApiV1WebpagesPost({
    requestBody,
  }: {
    requestBody: WebsitePageCreate,
  }): CancelablePromise<WebsitePageRead> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/webpages/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Website Pages:Read
   * Retrieve a single website page by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all website pages
   *
   * `role=user` : only website pages with a website_id associated with a client's
   * website via `client_website` table, associated with the user via `user_client`
   *
   * Returns:
   * --------
   * `WebsitePageRead` : the website page requested by page_id
   * @returns WebsitePageRead Successful Response
   * @throws ApiError
   */
  public static websitePagesReadApiV1WebpagesPageIdGet({
    pageId,
  }: {
    pageId: any,
  }): CancelablePromise<WebsitePageRead> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/webpages/{page_id}',
      path: {
        'page_id': pageId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Website Pages:Update
   * Update a website page by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all website pages
   *
   * `role=user` : only website pages with a website_id associated with a client's
   * website via `client_website` table, associated with the user via `user_client`
   *
   * Returns:
   * --------
   * `WebsitePageRead` : the updated website page
   * @returns WebsitePageRead Successful Response
   * @throws ApiError
   */
  public static websitePagesUpdateApiV1WebpagesPageIdPatch({
    pageId,
    requestBody,
  }: {
    pageId: any,
    requestBody: WebsitePageUpdate,
  }): CancelablePromise<WebsitePageRead> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/webpages/{page_id}',
      path: {
        'page_id': pageId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Website Pages:Delete
   * Delete a website page by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all website pages
   *
   * `role=user` : only website pages with a website_id associated with a client's
   * website via `client_website` table, associated with the user via `user_client`
   *
   * Returns:
   * --------
   * `None`
   * @returns any Successful Response
   * @throws ApiError
   */
  public static websitePagesDeleteApiV1WebpagesPageIdDelete({
    pageId,
  }: {
    pageId: any,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/webpages/{page_id}',
      path: {
        'page_id': pageId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Website Pages:Process Website Page Speed Insights
   * A webhook to initiate processing a website page's page speed insights.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all website pages
   *
   * `role=user` : only website pages with a website_id associated with a client's
   * website via `client_website` table, associated with the user via `user_client`
   *
   * Returns:
   * --------
   * `WebsitePagePSIProcessing` : a website page PSI processing object containing the
   * task_id's for the mobile and desktop page speed insights tasks
   * @returns WebsitePagePSIProcessing Successful Response
   * @throws ApiError
   */
  public static websitePagesProcessWebsitePageSpeedInsightsApiV1WebpagesPageIdProcessPsiPost({
    pageId,
  }: {
    pageId: any,
  }): CancelablePromise<WebsitePagePSIProcessing> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/webpages/{page_id}/process-psi',
      path: {
        'page_id': pageId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
