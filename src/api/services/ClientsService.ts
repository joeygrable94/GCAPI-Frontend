/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientCreate } from '../models/ClientCreate';
import type { ClientReadRelations } from '../models/ClientReadRelations';
import type { ClientUpdate } from '../models/ClientUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClientsService {

  /**
   * Clients:List
   * @returns ClientReadRelations Successful Response
   * @throws ApiError
   */
  public static clientsListApiV1ClientsGet({
    page = 1,
    clientId,
    websiteId,
  }: {
    page?: number,
    clientId?: any,
    websiteId?: any,
  }): CancelablePromise<Array<ClientReadRelations>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/clients/',
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
   * Clients:Create
   * @returns ClientReadRelations Successful Response
   * @throws ApiError
   */
  public static clientsCreateApiV1ClientsPost({
    requestBody,
  }: {
    requestBody: ClientCreate,
  }): CancelablePromise<ClientReadRelations> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/clients/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Clients:Read
   * @returns ClientReadRelations Successful Response
   * @throws ApiError
   */
  public static clientsReadApiV1ClientsClientIdGet({
    clientId,
  }: {
    clientId: any,
  }): CancelablePromise<ClientReadRelations> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/clients/{client_id}',
      path: {
        'client_id': clientId,
      },
      errors: {
        404: `Not Found`,
        422: `Validation Error`,
      },
    });
  }

  /**
   * Clients:Delete
   * @returns any Successful Response
   * @throws ApiError
   */
  public static clientsDeleteApiV1ClientsClientIdDelete({
    clientId,
  }: {
    clientId: any,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/clients/{client_id}',
      path: {
        'client_id': clientId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Clients:Update
   * @returns ClientReadRelations Successful Response
   * @throws ApiError
   */
  public static clientsUpdateApiV1ClientsClientIdPatch({
    clientId,
    requestBody,
  }: {
    clientId: any,
    requestBody: ClientUpdate,
  }): CancelablePromise<ClientReadRelations> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/clients/{client_id}',
      path: {
        'client_id': clientId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
