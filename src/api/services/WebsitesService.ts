/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebsiteCreate } from '../models/WebsiteCreate';
import type { WebsiteCreateProcessing } from '../models/WebsiteCreateProcessing';
import type { WebsiteReadRelations } from '../models/WebsiteReadRelations';
import type { WebsiteUpdate } from '../models/WebsiteUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WebsitesService {

  /**
   * Websites:List
   * @returns WebsiteReadRelations Successful Response
   * @throws ApiError
   */
  public static websitesListApiV1WebsitesGet({
    page = 1,
    clientId,
    websiteId,
  }: {
    page?: number,
    clientId?: any,
    websiteId?: any,
  }): CancelablePromise<Array<WebsiteReadRelations>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/websites/',
      query: {
        'page': page,
        'client_id': clientId,
        'website_id': websiteId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Websites:Create
   * @returns WebsiteCreateProcessing Successful Response
   * @throws ApiError
   */
  public static websitesCreateApiV1WebsitesPost({
    requestBody,
  }: {
    requestBody: WebsiteCreate,
  }): CancelablePromise<WebsiteCreateProcessing> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/websites/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Websites:Read
   * @returns WebsiteReadRelations Successful Response
   * @throws ApiError
   */
  public static websitesReadApiV1WebsitesWebsiteIdGet({
    websiteId,
  }: {
    websiteId: any,
  }): CancelablePromise<WebsiteReadRelations> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/websites/{website_id}',
      path: {
        'website_id': websiteId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Websites:Delete
   * @returns any Successful Response
   * @throws ApiError
   */
  public static websitesDeleteApiV1WebsitesWebsiteIdDelete({
    websiteId,
  }: {
    websiteId: any,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/websites/{website_id}',
      path: {
        'website_id': websiteId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Websites:Update
   * @returns WebsiteReadRelations Successful Response
   * @throws ApiError
   */
  public static websitesUpdateApiV1WebsitesWebsiteIdPatch({
    websiteId,
    requestBody,
  }: {
    websiteId: any,
    requestBody: WebsiteUpdate,
  }): CancelablePromise<WebsiteReadRelations> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/websites/{website_id}',
      path: {
        'website_id': websiteId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
