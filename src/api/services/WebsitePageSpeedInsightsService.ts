/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebsitePageSpeedInsightsBase } from '../models/WebsitePageSpeedInsightsBase';
import type { WebsitePageSpeedInsightsRead } from '../models/WebsitePageSpeedInsightsRead';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WebsitePageSpeedInsightsService {

  /**
   * Website Page Speed Insights:List
   * @returns WebsitePageSpeedInsightsRead Successful Response
   * @throws ApiError
   */
  public static websitePageSpeedInsightsListApiV1PsiGet({
    page = 1,
    websiteId,
    pageId,
    strategy,
  }: {
    page?: number,
    websiteId?: any,
    pageId?: any,
    strategy?: Array<string>,
  }): CancelablePromise<Array<WebsitePageSpeedInsightsRead>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/psi/',
      query: {
        'page': page,
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
   * @returns WebsitePageSpeedInsightsRead Successful Response
   * @throws ApiError
   */
  public static websitePageSpeedInsightsCreateApiV1PsiPost({
    requestBody,
    page = 1,
    websiteId,
    pageId,
    strategy,
  }: {
    requestBody: WebsitePageSpeedInsightsBase,
    page?: number,
    websiteId?: any,
    pageId?: any,
    strategy?: Array<string>,
  }): CancelablePromise<WebsitePageSpeedInsightsRead> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/psi/',
      query: {
        'page': page,
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
