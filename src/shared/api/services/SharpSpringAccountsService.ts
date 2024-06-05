/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paginated_SharpspringRead_ } from '../models/Paginated_SharpspringRead_';
import type { SharpspringCreate } from '../models/SharpspringCreate';
import type { SharpspringRead } from '../models/SharpspringRead';
import type { SharpspringUpdate } from '../models/SharpspringUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SharpSpringAccountsService {
    /**
     * Sharpspring:List
     * Retrieve a paginated list of sharpspring accounts.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all sharpspring accounts
     *
     * `role=user` : only sharpspring accounts that belong to the user
     *
     * Returns:
     * --------
     * `Paginated[SharpspringRead]` : a paginated list of sharpspring accounts,
     * optionally filtered
     * @returns Paginated_SharpspringRead_ Successful Response
     * @throws ApiError
     */
    public static sharpspringListApiV1SharpspringGet({
        page,
        size,
        userId,
        clientId,
    }: {
        page?: (number | null),
        size?: (number | null),
        userId?: (string | null),
        clientId?: (string | null),
    }): CancelablePromise<Paginated_SharpspringRead_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/sharpspring/',
            query: {
                'page': page,
                'size': size,
                'user_id': userId,
                'client_id': clientId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Sharpspring:Create
     * Create a new sharpspring account.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : create new sharpspring accounts for all clients
     *
     * `role=user` : create only sharpspring accounts that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `SharpspringRead` : the newly created sharpspring account
     * @returns SharpspringRead Successful Response
     * @throws ApiError
     */
    public static sharpspringCreateApiV1SharpspringPost({
        requestBody,
    }: {
        requestBody: SharpspringCreate,
    }): CancelablePromise<SharpspringRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/sharpspring/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Sharpspring:Read
     * Retrieve a single sharpspring account by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : read all sharpspring accounts
     *
     * `role=user` : read only sharpspring accounts that belong to any clients
     * associated with the current user
     *
     * Returns:
     * --------
     * `SharpspringRead` : the sharpspring account matching the ss_id
     * @returns SharpspringRead Successful Response
     * @throws ApiError
     */
    public static sharpspringReadApiV1SharpspringSsIdGet({
        ssId,
    }: {
        ssId: any,
    }): CancelablePromise<SharpspringRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/sharpspring/{ss_id}',
            path: {
                'ss_id': ssId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Sharpspring:Update
     * Update a sharpspring account by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : update all sharpspring accounts
     *
     * `role=user` : update only sharpspring accounts that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `SharpspringRead` : the updated sharpspring account
     * @returns SharpspringRead Successful Response
     * @throws ApiError
     */
    public static sharpspringUpdateApiV1SharpspringSsIdPatch({
        ssId,
        requestBody,
    }: {
        ssId: any,
        requestBody: SharpspringUpdate,
    }): CancelablePromise<SharpspringRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/sharpspring/{ss_id}',
            path: {
                'ss_id': ssId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Sharpspring:Delete
     * Delete a sharpspring account by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : delete any sharpspring accounts
     *
     * `role=user` : delete only sharpspring accounts that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `None`
     * @returns any Successful Response
     * @throws ApiError
     */
    public static sharpspringDeleteApiV1SharpspringSsIdDelete({
        ssId,
    }: {
        ssId: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/sharpspring/{ss_id}',
            path: {
                'ss_id': ssId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
