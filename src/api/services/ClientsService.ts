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
   * Clients:Read Clients
   * @returns ClientReadRelations Successful Response
   * @throws ApiError
   */
  public static clientsReadClientsApiV1ClientsGet({
    page = 1,
  }: {
    page?: number,
  }): CancelablePromise<Array<ClientReadRelations>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/clients/',
      query: {
        'page': page,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Clients:Create Client
   * @returns ClientReadRelations Successful Response
   * @throws ApiError
   */
  public static clientsCreateClientApiV1ClientsPost({
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
   * Clients:Read Client
   * @returns ClientReadRelations Successful Response
   * @throws ApiError
   */
  public static clientsReadClientApiV1ClientsIdGet({
    id,
  }: {
    id: string,
  }): CancelablePromise<ClientReadRelations> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/clients/{id}',
      path: {
        'id': id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Clients:Delete Client
   * @returns any Successful Response
   * @throws ApiError
   */
  public static clientsDeleteClientApiV1ClientsIdDelete({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/clients/{id}',
      path: {
        'id': id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Clients:Update Client
   * @returns ClientReadRelations Successful Response
   * @throws ApiError
   */
  public static clientsUpdateClientApiV1ClientsIdPatch({
    id,
    requestBody,
  }: {
    id: string,
    requestBody: ClientUpdate,
  }): CancelablePromise<ClientReadRelations> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/clients/{id}',
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
