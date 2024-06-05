/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GoAnalytics4PropertyCreate } from '../models/GoAnalytics4PropertyCreate';
import type { GoAnalytics4PropertyRead } from '../models/GoAnalytics4PropertyRead';
import type { GoAnalytics4PropertyUpdate } from '../models/GoAnalytics4PropertyUpdate';
import type { Paginated_GoAnalytics4PropertyRead_ } from '../models/Paginated_GoAnalytics4PropertyRead_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GoogleAnalytics4PropertiesService {
    /**
     * Ga4 Property:List
     * Retrieve a paginated list of ga4 properties.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all ga4 properties
     *
     * `role=user` : only ga4 properties that belong to the user
     *
     * Returns:
     * --------
     * `Paginated[GoAnalytics4PropertyRead]` : a paginated list of ga4 properties,
     * optionally filtered
     * @returns Paginated_GoAnalytics4PropertyRead_ Successful Response
     * @throws ApiError
     */
    public static ga4PropertyListApiV1Ga4PropertyGet({
        page,
        size,
        clientId,
    }: {
        page?: (number | null),
        size?: (number | null),
        clientId?: (string | null),
    }): CancelablePromise<Paginated_GoAnalytics4PropertyRead_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ga4/property/',
            query: {
                'page': page,
                'size': size,
                'client_id': clientId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Ga4 Property:Create
     * Create a new ga4 properties.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : create new ga4 properties for all clients
     *
     * `role=user` : create only ga4 properties that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `GoAnalytics4PropertyRead` : the newly created ga4 property
     * @returns GoAnalytics4PropertyRead Successful Response
     * @throws ApiError
     */
    public static ga4PropertyCreateApiV1Ga4PropertyPost({
        requestBody,
    }: {
        requestBody: GoAnalytics4PropertyCreate,
    }): CancelablePromise<GoAnalytics4PropertyRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ga4/property/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Ga4 Property:Read
     * Retrieve a single ga4 property by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : read all ga4 properties
     *
     * `role=user` : read only ga4 properties that belong to any clients
     * associated with the current user
     *
     * Returns:
     * --------
     * `GoAnalytics4PropertyRead` : the ga4 property matching the ga4_id
     * @returns GoAnalytics4PropertyRead Successful Response
     * @throws ApiError
     */
    public static ga4PropertyReadApiV1Ga4PropertyGa4IdGet({
        ga4Id,
    }: {
        ga4Id: any,
    }): CancelablePromise<GoAnalytics4PropertyRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ga4/property/{ga4_id}',
            path: {
                'ga4_id': ga4Id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Ga4 Property:Update
     * Update a ga4 property by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : update all ga4 properties
     *
     * `role=user` : update only ga4 properties that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `GoAnalytics4PropertyRead` : the updated ga4 property
     * @returns GoAnalytics4PropertyRead Successful Response
     * @throws ApiError
     */
    public static ga4PropertyUpdateApiV1Ga4PropertyGa4IdPatch({
        ga4Id,
        requestBody,
    }: {
        ga4Id: any,
        requestBody: GoAnalytics4PropertyUpdate,
    }): CancelablePromise<GoAnalytics4PropertyRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/ga4/property/{ga4_id}',
            path: {
                'ga4_id': ga4Id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Ga4 Property:Delete
     * Delete a ga4 property by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : delete any ga4 properties
     *
     * `role=user` : delete only ga4 properties that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `None`
     * @returns any Successful Response
     * @throws ApiError
     */
    public static ga4PropertyDeleteApiV1Ga4PropertyGa4IdDelete({
        ga4Id,
    }: {
        ga4Id: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/ga4/property/{ga4_id}',
            path: {
                'ga4_id': ga4Id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
