/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebsiteCreate } from '../models/WebsiteCreate';
import type { WebsiteReadRelations } from '../models/WebsiteReadRelations';
import type { WebsiteUpdate } from '../models/WebsiteUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WebsitesService {

  /**
   * Websites:Read Websites
   * @returns WebsiteReadRelations Successful Response
   * @throws ApiError
   */
  public static websitesReadWebsitesApiV1WebsitesGet({
    page = 1,
  }: {
    page?: number,
  }): CancelablePromise<Array<WebsiteReadRelations>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/websites/',
      query: {
        'page': page,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Websites:Create Website
   * @returns WebsiteReadRelations Successful Response
   * @throws ApiError
   */
  public static websitesCreateWebsiteApiV1WebsitesPost({
    requestBody,
    clientId,
  }: {
    requestBody: WebsiteCreate,
    clientId?: any,
  }): CancelablePromise<WebsiteReadRelations> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/websites/',
      query: {
        'client_id': clientId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Websites:Read Website
   * @returns WebsiteReadRelations Successful Response
   * @throws ApiError
   */
  public static websitesReadWebsiteApiV1WebsitesIdGet({
    id,
  }: {
    id: string,
  }): CancelablePromise<WebsiteReadRelations> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/websites/{id}',
      path: {
        'id': id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Websites:Delete Website
   * @returns any Successful Response
   * @throws ApiError
   */
  public static websitesDeleteWebsiteApiV1WebsitesIdDelete({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/websites/{id}',
      path: {
        'id': id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Websites:Update Website
   * @returns WebsiteReadRelations Successful Response
   * @throws ApiError
   */
  public static websitesUpdateWebsiteApiV1WebsitesIdPatch({
    id,
    requestBody,
  }: {
    id: string,
    requestBody: WebsiteUpdate,
  }): CancelablePromise<WebsiteReadRelations> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/websites/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
