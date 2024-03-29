/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientCreate } from '../models/ClientCreate';
import type { ClientDelete } from '../models/ClientDelete';
import type { ClientRead } from '../models/ClientRead';
import type { ClientUpdate } from '../models/ClientUpdate';
import type { Paginated_ClientRead_ } from '../models/Paginated_ClientRead_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClientsService {
  /**
   * Clients:List
   * Retrieve a paginated list of clients.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all clients
   *
   * `role=user` : only clients associated with the user via `user_client`
   * table
   *
   * Returns:
   * --------
   * `Paginated[ClientRead]` : a paginated list of clients, optionally filtered
   * @returns Paginated_ClientRead_ Successful Response
   * @throws ApiError
   */
  public static clientsListApiV1ClientsGet({
    page,
    size,
    userId,
  }: {
    page?: (number | null),
    size?: (number | null),
    userId?: null,
  }): CancelablePromise<Paginated_ClientRead_> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/clients/',
      query: {
        'page': page,
        'size': size,
        'user_id': userId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Clients:Create
   * Create a new client.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : create a new client
   *
   * Returns:
   * --------
   * `ClientRead` : the newly created client
   * @returns ClientRead Successful Response
   * @throws ApiError
   */
  public static clientsCreateApiV1ClientsPost({
    requestBody,
  }: {
    requestBody: ClientCreate,
  }): CancelablePromise<ClientRead> {
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
   * Retrieve a single client by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all clients
   *
   * `role=user` : only clients associated with the user via `user_client`
   *
   * Returns:
   * --------
   * `ClientRead` : a client matching the client_id
   * @returns ClientRead Successful Response
   * @throws ApiError
   */
  public static clientsReadApiV1ClientsClientIdGet({
    clientId,
  }: {
    clientId: null,
  }): CancelablePromise<ClientRead> {
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
   * Clients:Update
   * Update a client by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all clients
   *
   * `role=user` : only clients associated with the user via `user_client`
   *
   * Returns:
   * --------
   * `ClientRead` : the updated client
   * @returns ClientRead Successful Response
   * @throws ApiError
   */
  public static clientsUpdateApiV1ClientsClientIdPatch({
    clientId,
    requestBody,
  }: {
    clientId: null,
    requestBody: ClientUpdate,
  }): CancelablePromise<ClientRead> {
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
  /**
   * Clients:Delete
   * Delete a client by id.
   *
   * Permissions:
   * ------------
   * `role=admin` : all clients
   *
   * `role=client` : may request to have their client data deleted
   *
   * Returns:
   * --------
   * `ClientDelete` : a message indicating the user deleted a client or if a user
   * requested to delete a client they are associated with
   * @returns ClientDelete Successful Response
   * @throws ApiError
   */
  public static clientsDeleteApiV1ClientsClientIdDelete({
    clientId,
  }: {
    clientId: null,
  }): CancelablePromise<ClientDelete> {
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
}
