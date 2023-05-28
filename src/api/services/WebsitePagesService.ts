/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebsitePageCreate } from '../models/WebsitePageCreate';
import type { WebsitePageFetchPSIProcessing } from '../models/WebsitePageFetchPSIProcessing';
import type { WebsitePageReadRelations } from '../models/WebsitePageReadRelations';
import type { WebsitePageUpdate } from '../models/WebsitePageUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WebsitePagesService {

  /**
   * Website Pages:List
   * @returns WebsitePageReadRelations Successful Response
   * @throws ApiError
   */
  public static websitePagesListApiV1WebpagesGet({
    page = 1,
    websiteId,
    sitemapId,
  }: {
    page?: number,
    websiteId?: any,
    sitemapId?: any,
  }): CancelablePromise<Array<WebsitePageReadRelations>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/webpages/',
      query: {
        'page': page,
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
   * @returns WebsitePageFetchPSIProcessing Successful Response
   * @throws ApiError
   */
  public static websitePagesCreateApiV1WebpagesPost({
    requestBody,
  }: {
    requestBody: WebsitePageCreate,
  }): CancelablePromise<WebsitePageFetchPSIProcessing> {
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
   * @returns WebsitePageReadRelations Successful Response
   * @throws ApiError
   */
  public static websitePagesReadApiV1WebpagesPageIdGet({
    pageId,
  }: {
    pageId: any,
  }): CancelablePromise<WebsitePageReadRelations> {
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
   * Website Pages:Delete
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
   * Website Pages:Update
   * @returns WebsitePageReadRelations Successful Response
   * @throws ApiError
   */
  public static websitePagesUpdateApiV1WebpagesPageIdPatch({
    pageId,
    requestBody,
  }: {
    pageId: any,
    requestBody: WebsitePageUpdate,
  }): CancelablePromise<WebsitePageReadRelations> {
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

}
