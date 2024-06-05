/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BdxFeedCreate } from '../models/BdxFeedCreate';
import type { BdxFeedRead } from '../models/BdxFeedRead';
import type { BdxFeedUpdate } from '../models/BdxFeedUpdate';
import type { Paginated_BdxFeedRead_ } from '../models/Paginated_BdxFeedRead_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BdxFeedsService {
    /**
     * Bdx Feed:List
     * Retrieve a paginated list of bdx_feeds.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all bdx_feeds
     *
     * `role=user` : only bdx_feeds that belong to the user
     *
     * Returns:
     * --------
     * `Paginated[BdxFeedRead]` : a paginated list of bdx_feeds,
     * optionally filtered
     * @returns Paginated_BdxFeedRead_ Successful Response
     * @throws ApiError
     */
    public static bdxFeedListApiV1BdxGet({
        page,
        size,
        clientId,
    }: {
        page?: (number | null),
        size?: (number | null),
        clientId?: (string | null),
    }): CancelablePromise<Paginated_BdxFeedRead_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/bdx/',
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
     * Bdx Feed:Create
     * Create a new bdx_feeds.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : create new bdx_feeds for all clients
     *
     * `role=user` : create only bdx_feeds that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `BdxFeedRead` : the newly created bdx_feed
     * @returns BdxFeedRead Successful Response
     * @throws ApiError
     */
    public static bdxFeedCreateApiV1BdxPost({
        requestBody,
    }: {
        requestBody: BdxFeedCreate,
    }): CancelablePromise<BdxFeedRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/bdx/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Bdx Feed:Read
     * Retrieve a single bdx_feed by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : read all bdx_feeds
     *
     * `role=user` : read only bdx_feeds that belong to any clients
     * associated with the current user
     *
     * Returns:
     * --------
     * `BdxFeedRead` : the bdx_feed matching the bdx_id
     * @returns BdxFeedRead Successful Response
     * @throws ApiError
     */
    public static bdxFeedReadApiV1BdxBdxIdGet({
        bdxId,
    }: {
        bdxId: any,
    }): CancelablePromise<BdxFeedRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/bdx/{bdx_id}',
            path: {
                'bdx_id': bdxId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Bdx Feed:Update
     * Update a bdx_feed by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : update all bdx_feeds
     *
     * `role=user` : update only bdx_feeds that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `BdxFeedRead` : the updated bdx_feed
     * @returns BdxFeedRead Successful Response
     * @throws ApiError
     */
    public static bdxFeedUpdateApiV1BdxBdxIdPatch({
        bdxId,
        requestBody,
    }: {
        bdxId: any,
        requestBody: BdxFeedUpdate,
    }): CancelablePromise<BdxFeedRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/bdx/{bdx_id}',
            path: {
                'bdx_id': bdxId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Bdx Feed:Delete
     * Delete a bdx_feed by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : delete any bdx_feeds
     *
     * `role=user` : delete only bdx_feeds that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `None`
     * @returns any Successful Response
     * @throws ApiError
     */
    public static bdxFeedDeleteApiV1BdxBdxIdDelete({
        bdxId,
    }: {
        bdxId: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/bdx/{bdx_id}',
            path: {
                'bdx_id': bdxId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
