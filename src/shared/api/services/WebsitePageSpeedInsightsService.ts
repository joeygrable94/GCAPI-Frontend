/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paginated_WebsitePageSpeedInsightsRead_ } from '../models/Paginated_WebsitePageSpeedInsightsRead_';
import type { WebsitePageSpeedInsightsBase } from '../models/WebsitePageSpeedInsightsBase';
import type { WebsitePageSpeedInsightsRead } from '../models/WebsitePageSpeedInsightsRead';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebsitePageSpeedInsightsService {
  /**
   * Website Page Speed Insights:List
   * Retrieve a paginated list of website page speed insights.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all website page speed insights
   *
   * `role=client` : only website page speed insights with a website_id associated with
   * the client via `client_website` table
   *
   * `role=employee` : only website page speed insights with a website_id associated
   * with a client's website via `client_website` table, associated with the user
   * via `user_client`
   *
   * Returns:
   * --------
   * `Paginated[WebsitePageSpeedInsightsRead]` : a paginated list of website page speed
   * insights, optionally filtered
   * @returns Paginated_WebsitePageSpeedInsightsRead_ Successful Response
   * @throws ApiError
   */
  public static websitePageSpeedInsightsListApiV1PsiGet({
    page,
    size,
    websiteId,
    pageId,
    strategy,
  }: {
    page?: (number | null),
    size?: (number | null),
    websiteId?: (string | null),
    pageId?: (string | null),
    strategy?: (Array<string> | null),
  }): CancelablePromise<Paginated_WebsitePageSpeedInsightsRead_> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/psi/',
      query: {
        'page': page,
        'size': size,
        'website_id': websiteId,
        'page_id': pageId,
        'strategy': strategy,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Website Page Speed Insights:Create
   * Create a new website page speed insights.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : create a new website page speed insights
   *
   * `role=client` : create a new website page speed insights that belongs to a website
   * associated with the client via `client_website` table
   *
   * `role=employee` : create a new website page speed insights that belongs to a website
   * associated with a client via `client_website` table, associated with the user
   * via the `user_client` table
   *
   * Returns:
   * --------
   * `WebsitePageSpeedInsightsRead` : the newly created website page speed insights
   * @returns WebsitePageSpeedInsightsRead Successful Response
   * @throws ApiError
   */
  public static websitePageSpeedInsightsCreateApiV1PsiPost({
    requestBody,
    page,
    size,
    websiteId,
    pageId,
    strategy,
  }: {
    requestBody: WebsitePageSpeedInsightsBase,
    page?: (number | null),
    size?: (number | null),
    websiteId?: (string | null),
    pageId?: (string | null),
    strategy?: (Array<string> | null),
  }): CancelablePromise<WebsitePageSpeedInsightsRead> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/psi/',
      query: {
        'page': page,
        'size': size,
        'website_id': websiteId,
        'page_id': pageId,
        'strategy': strategy,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Website Page Speed Insights:Read
   * Retrieve a single website page speed insights by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : read any website page speed insight
   *
   * `role=client` : read any website page speed insight that belongs to a website
   * associated with the client via `client_website` table
   *
   * `role=employee` : read any website page speed insight that belongs to a website
   * associated with a client via `client_website` table, associated with the user
   * via the `user_client` table
   *
   * Returns:
   * --------
   * `WebsitePageSpeedInsightsRead` : the website page speed insights requested by psi_id
   * @returns WebsitePageSpeedInsightsRead Successful Response
   * @throws ApiError
   */
  public static websitePageSpeedInsightsReadApiV1PsiPsiIdGet({
    psiId,
  }: {
    psiId: any,
  }): CancelablePromise<WebsitePageSpeedInsightsRead> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/psi/{psi_id}',
      path: {
        'psi_id': psiId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Website Page Speed Insights:Delete
   * Delete a single website page speed insights by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : delete any website page speed insight
   *
   * `role=client` : delete any website page speed insight that belongs to a website
   * associated with the client via `client_website` table
   *
   * `role=employee` : delete any website page speed insight that belongs to a website
   * associated with a client via `client_website` table, associated with the user
   * via the `user_client` table
   *
   * Returns:
   * --------
   * `None`
   * @returns any Successful Response
   * @throws ApiError
   */
  public static websitePageSpeedInsightsDeleteApiV1PsiPsiIdDelete({
    psiId,
  }: {
    psiId: any,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/psi/{psi_id}',
      path: {
        'psi_id': psiId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
