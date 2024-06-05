/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GoAnalytics4StreamCreate } from '../models/GoAnalytics4StreamCreate';
import type { GoAnalytics4StreamRead } from '../models/GoAnalytics4StreamRead';
import type { GoAnalytics4StreamUpdate } from '../models/GoAnalytics4StreamUpdate';
import type { Paginated_GoAnalytics4StreamRead_ } from '../models/Paginated_GoAnalytics4StreamRead_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GoogleAnalytics4PropertyStreamsService {
    /**
     * Ga4 Stream:List
     * Retrieve a paginated list of ga4 streams.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all ga4 streams
     *
     * `role=user` : only ga4 streams that belong to the user
     *
     * Returns:
     * --------
     * `Paginated[GoAnalytics4StreamRead]` : a paginated list of ga4 streams,
     * optionally filtered
     * @returns Paginated_GoAnalytics4StreamRead_ Successful Response
     * @throws ApiError
     */
    public static ga4StreamListApiV1Ga4StreamGet({
        page,
        size,
        websiteId,
        ga4Id,
    }: {
        page?: (number | null),
        size?: (number | null),
        websiteId?: (string | null),
        ga4Id?: (string | null),
    }): CancelablePromise<Paginated_GoAnalytics4StreamRead_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ga4/stream/',
            query: {
                'page': page,
                'size': size,
                'website_id': websiteId,
                'ga4_id': ga4Id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Ga4 Stream:Create
     * Create a new ga4 streams.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : create new ga4 streams for all clients
     *
     * `role=user` : create only ga4 streams that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `GoAnalytics4StreamRead` : the newly created ga4 stream
     * @returns GoAnalytics4StreamRead Successful Response
     * @throws ApiError
     */
    public static ga4StreamCreateApiV1Ga4StreamPost({
        requestBody,
    }: {
        requestBody: GoAnalytics4StreamCreate,
    }): CancelablePromise<GoAnalytics4StreamRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ga4/stream/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Ga4 Stream:Read
     * Retrieve a single ga4 stream by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : read all ga4 streams
     *
     * `role=user` : read only ga4 streams that belong to any clients
     * associated with the current user
     *
     * Returns:
     * --------
     * `GoAnalytics4StreamRead` : the ga4 stream matching the ga4_stream_id
     * @returns GoAnalytics4StreamRead Successful Response
     * @throws ApiError
     */
    public static ga4StreamReadApiV1Ga4StreamGa4StreamIdGet({
        ga4StreamId,
    }: {
        ga4StreamId: any,
    }): CancelablePromise<GoAnalytics4StreamRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ga4/stream/{ga4_stream_id}',
            path: {
                'ga4_stream_id': ga4StreamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Ga4 Stream:Update
     * Update a ga4 stream by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : update all ga4 streams
     *
     * `role=user` : update only ga4 streams that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `GoAnalytics4StreamRead` : the updated ga4 stream
     * @returns GoAnalytics4StreamRead Successful Response
     * @throws ApiError
     */
    public static ga4StreamUpdateApiV1Ga4StreamGa4StreamIdPatch({
        ga4StreamId,
        requestBody,
    }: {
        ga4StreamId: any,
        requestBody: GoAnalytics4StreamUpdate,
    }): CancelablePromise<GoAnalytics4StreamRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/ga4/stream/{ga4_stream_id}',
            path: {
                'ga4_stream_id': ga4StreamId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Ga4 Stream:Delete
     * Delete a ga4 stream by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : delete any ga4 streams
     *
     * `role=user` : delete only ga4 streams that belong to any clients associated
     * with the current user
     *
     * Returns:
     * --------
     * `None`
     * @returns any Successful Response
     * @throws ApiError
     */
    public static ga4StreamDeleteApiV1Ga4StreamGa4StreamIdDelete({
        ga4StreamId,
    }: {
        ga4StreamId: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/ga4/stream/{ga4_stream_id}',
            path: {
                'ga4_stream_id': ga4StreamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
