/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GoSearchConsolePropertyCreate } from '../models/GoSearchConsolePropertyCreate';
import type { GoSearchConsolePropertyRead } from '../models/GoSearchConsolePropertyRead';
import type { GoSearchConsolePropertyUpdate } from '../models/GoSearchConsolePropertyUpdate';
import type { Paginated_GoSearchConsolePropertyRead_ } from '../models/Paginated_GoSearchConsolePropertyRead_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GoogleSearchConsolePropertiesService {
    /**
     * Go Search Console Property:List
     * Retrieve a paginated list of google search console properties.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all google search console properties
     *
     * `role=user` : only google search console properties that belong to the user
     *
     * Returns:
     * --------
     * `Paginated[GoSearchConsolePropertyRead]` : a paginated list of google search
     * console properties, optionally filtered
     * @returns Paginated_GoSearchConsolePropertyRead_ Successful Response
     * @throws ApiError
     */
    public static goSearchConsolePropertyListApiV1GoSearchPropertyGet({
        page,
        size,
        clientId,
        websiteId,
    }: {
        page?: (number | null),
        size?: (number | null),
        clientId?: (string | null),
        websiteId?: (string | null),
    }): CancelablePromise<Paginated_GoSearchConsolePropertyRead_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/go/search/property/',
            query: {
                'page': page,
                'size': size,
                'client_id': clientId,
                'website_id': websiteId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Go Search Console Property:Create
     * Create a new google search console properties.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : create new google search console properties
     * for all clients
     *
     * `role=user` : create only google search console properties that belong
     * to any clients associated with the current user
     *
     * Returns:
     * --------
     * `GoSearchConsolePropertyRead` : the newly created google search console
     * property
     * @returns GoSearchConsolePropertyRead Successful Response
     * @throws ApiError
     */
    public static goSearchConsolePropertyCreateApiV1GoSearchPropertyPost({
        requestBody,
    }: {
        requestBody: GoSearchConsolePropertyCreate,
    }): CancelablePromise<GoSearchConsolePropertyRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/go/search/property/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Go Search Console Property:Read
     * Retrieve a single google search console property by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : read all google search console properties
     *
     * `role=user` : read only google search console properties that belong to
     * any clients associated with the current user
     *
     * Returns:
     * --------
     * `GoSearchConsolePropertyRead` : the google search console property matching
     * the gsc_id
     * @returns GoSearchConsolePropertyRead Successful Response
     * @throws ApiError
     */
    public static goSearchConsolePropertyReadApiV1GoSearchPropertyGscIdGet({
        gscId,
    }: {
        gscId: any,
    }): CancelablePromise<GoSearchConsolePropertyRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/go/search/property/{gsc_id}',
            path: {
                'gsc_id': gscId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Go Search Console Property:Update
     * Update a google search console property by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : update all google search console properties
     *
     * `role=user` : update only google search console properties that belong to
     * any clients associated with the current user
     *
     * Returns:
     * --------
     * `GoSearchConsolePropertyRead` : the updated google search console property
     * @returns GoSearchConsolePropertyRead Successful Response
     * @throws ApiError
     */
    public static goSearchConsolePropertyUpdateApiV1GoSearchPropertyGscIdPatch({
        gscId,
        requestBody,
    }: {
        gscId: any,
        requestBody: GoSearchConsolePropertyUpdate,
    }): CancelablePromise<GoSearchConsolePropertyRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/go/search/property/{gsc_id}',
            path: {
                'gsc_id': gscId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Go Search Console Property:Delete
     * Delete a google search console property by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : delete any google search console properties
     *
     * `role=user` : delete only google search console properties that belong to
     * any clients associated with the current user
     *
     * Returns:
     * --------
     * `None`
     * @returns any Successful Response
     * @throws ApiError
     */
    public static goSearchConsolePropertyDeleteApiV1GoSearchPropertyGscIdDelete({
        gscId,
    }: {
        gscId: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/go/search/property/{gsc_id}',
            path: {
                'gsc_id': gscId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
