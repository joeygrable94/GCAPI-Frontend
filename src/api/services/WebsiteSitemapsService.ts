/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebsiteMapCreate } from '../models/WebsiteMapCreate';
import type { WebsiteMapReadRelations } from '../models/WebsiteMapReadRelations';
import type { WebsiteMapUpdate } from '../models/WebsiteMapUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WebsiteSitemapsService {

  /**
   * Website Sitemaps:List
   * @returns WebsiteMapReadRelations Successful Response
   * @throws ApiError
   */
  public static websiteSitemapsListApiV1SitemapsGet({
    page = 1,
    websiteId,
    sitemapId,
  }: {
    page?: number,
    websiteId?: any,
    sitemapId?: any,
  }): CancelablePromise<Array<WebsiteMapReadRelations>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/sitemaps/',
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
   * Website Sitemaps:Create
   * @returns WebsiteMapReadRelations Successful Response
   * @throws ApiError
   */
  public static websiteSitemapsCreateApiV1SitemapsPost({
    requestBody,
  }: {
    requestBody: WebsiteMapCreate,
  }): CancelablePromise<WebsiteMapReadRelations> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/sitemaps/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Website Sitemaps:Read
   * @returns WebsiteMapReadRelations Successful Response
   * @throws ApiError
   */
  public static websiteSitemapsReadApiV1SitemapsSitemapIdGet({
    sitemapId,
  }: {
    sitemapId: any,
  }): CancelablePromise<WebsiteMapReadRelations> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/sitemaps/{sitemap_id}',
      path: {
        'sitemap_id': sitemapId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Website Sitemaps:Delete
   * @returns any Successful Response
   * @throws ApiError
   */
  public static websiteSitemapsDeleteApiV1SitemapsSitemapIdDelete({
    sitemapId,
  }: {
    sitemapId: any,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/sitemaps/{sitemap_id}',
      path: {
        'sitemap_id': sitemapId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Website Sitemaps:Update
   * @returns WebsiteMapReadRelations Successful Response
   * @throws ApiError
   */
  public static websiteSitemapsUpdateApiV1SitemapsSitemapIdPatch({
    sitemapId,
    requestBody,
  }: {
    sitemapId: any,
    requestBody: WebsiteMapUpdate,
  }): CancelablePromise<WebsiteMapReadRelations> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/sitemaps/{sitemap_id}',
      path: {
        'sitemap_id': sitemapId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
