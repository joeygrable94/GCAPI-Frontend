/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GoCloudPropertyCreate } from '../models/GoCloudPropertyCreate';
import type { GoCloudPropertyRead } from '../models/GoCloudPropertyRead';
import type { GoCloudPropertyUpdate } from '../models/GoCloudPropertyUpdate';
import type { Paginated_GoCloudPropertyRead_ } from '../models/Paginated_GoCloudPropertyRead_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GoogleCloudAccountsService {
    /**
     * Go Cloud Property:List
     * Retrieve a paginated list of go_cloud property.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all go_cloud properties
     *
     * `role=user` : only go_cloud properties that belong to the user
     *
     * Returns:
     * --------
     * `Paginated[GoCloudPropertyRead]` : a paginated list of go_cloud properties,
     * optionally filtered
     * @returns Paginated_GoCloudPropertyRead_ Successful Response
     * @throws ApiError
     */
    public static goCloudPropertyListApiV1GoCloudGet({
        page,
        size,
        clientId,
    }: {
        page?: (number | null),
        size?: (number | null),
        clientId?: (string | null),
    }): CancelablePromise<Paginated_GoCloudPropertyRead_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/go/cloud/',
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
     * Go Cloud Property:Create
     * Create a new go_cloud property.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : create new go_cloud properties for all clients
     *
     * `role=user` : create only go_cloud properties that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `GoCloudPropertyRead` : the newly created go_cloud
     * @returns GoCloudPropertyRead Successful Response
     * @throws ApiError
     */
    public static goCloudPropertyCreateApiV1GoCloudPost({
        requestBody,
    }: {
        requestBody: GoCloudPropertyCreate,
    }): CancelablePromise<GoCloudPropertyRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/go/cloud/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Go Cloud Property:Read
     * Retrieve a single go_cloud property by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : read all go_cloud properties
     *
     * `role=user` : read only go_cloud properties that belong to any clients
     * associated with the current user
     *
     * Returns:
     * --------
     * `GoCloudPropertyRead` : the go_cloud matching the go_cloud_id
     * @returns GoCloudPropertyRead Successful Response
     * @throws ApiError
     */
    public static goCloudPropertyReadApiV1GoCloudGoCloudIdGet({
        goCloudId,
    }: {
        goCloudId: any,
    }): CancelablePromise<GoCloudPropertyRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/go/cloud/{go_cloud_id}',
            path: {
                'go_cloud_id': goCloudId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Go Cloud Property:Update
     * Update a go_cloud by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : update all go_cloud properties
     *
     * `role=user` : update only go_cloud properties that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `GoCloudPropertyRead` : the updated go_cloud property
     * @returns GoCloudPropertyRead Successful Response
     * @throws ApiError
     */
    public static goCloudPropertyUpdateApiV1GoCloudGoCloudIdPatch({
        goCloudId,
        requestBody,
    }: {
        goCloudId: any,
        requestBody: GoCloudPropertyUpdate,
    }): CancelablePromise<GoCloudPropertyRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/go/cloud/{go_cloud_id}',
            path: {
                'go_cloud_id': goCloudId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Go Cloud Property:Delete
     * Delete a go_cloud property by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : delete any go_cloud properties
     *
     * `role=user` : delete only go_cloud properties that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `None`
     * @returns any Successful Response
     * @throws ApiError
     */
    public static goCloudPropertyDeleteApiV1GoCloudGoCloudIdDelete({
        goCloudId,
    }: {
        goCloudId: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/go/cloud/{go_cloud_id}',
            path: {
                'go_cloud_id': goCloudId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
