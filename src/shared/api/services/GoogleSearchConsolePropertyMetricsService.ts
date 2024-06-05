/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GoSearchConsoleMetricCreate } from '../models/GoSearchConsoleMetricCreate';
import type { GoSearchConsoleMetricPages } from '../models/GoSearchConsoleMetricPages';
import type { GoSearchConsoleMetricRead } from '../models/GoSearchConsoleMetricRead';
import type { GoSearchConsoleMetricType } from '../models/GoSearchConsoleMetricType';
import type { GoSearchConsoleMetricUpdate } from '../models/GoSearchConsoleMetricUpdate';
import type { Paginated_GoSearchConsoleMetricRead_ } from '../models/Paginated_GoSearchConsoleMetricRead_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GoogleSearchConsolePropertyMetricsService {
    /**
     * Go Search Console Property Metric:List All Metric Types
     * Retrieve a paginated list of all the google search console property metrics
     * for the given google search console property id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all google search console property metrics
     *
     * `role=user` : only google search console property metrics that belong to the user
     *
     * Returns:
     * --------
     * `Paginated[GoSearchConsoleMetricRead]` : a paginated list of google search
     * console property metrics, optionally filtered
     * @returns GoSearchConsoleMetricPages Successful Response
     * @throws ApiError
     */
    public static goSearchConsolePropertyMetricListAllMetricTypesApiV1GoSearchMetricGscIdGet({
        gscId,
        page,
        size,
        metricTypes,
        dateStart,
        dateEnd,
    }: {
        gscId: any,
        page?: (number | null),
        size?: (number | null),
        metricTypes?: (string | null),
        dateStart?: (string | null),
        dateEnd?: (string | null),
    }): CancelablePromise<GoSearchConsoleMetricPages> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/go/search/metric/{gsc_id}',
            path: {
                'gsc_id': gscId,
            },
            query: {
                'page': page,
                'size': size,
                'metric_types': metricTypes,
                'date_start': dateStart,
                'date_end': dateEnd,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Go Search Console Property Metric:List By Metric Type
     * Retrieve a paginated list of google search console property metrics filtered
     * by the metric_type parameter.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all google search console property metrics
     *
     * `role=user` : only google search console property metrics that belong to the user
     *
     * Returns:
     * --------
     * `Paginated[GoSearchConsoleMetricRead]` : a paginated list of google search
     * console property metrics, optionally filtered
     * @returns Paginated_GoSearchConsoleMetricRead_ Successful Response
     * @throws ApiError
     */
    public static goSearchConsolePropertyMetricListByMetricTypeApiV1GoSearchMetricGscIdMetricTypeGet({
        metricType,
        gscId,
        page,
        size,
        metricTypes,
        dateStart,
        dateEnd,
    }: {
        metricType: GoSearchConsoleMetricType,
        gscId: any,
        page?: (number | null),
        size?: (number | null),
        metricTypes?: (string | null),
        dateStart?: (string | null),
        dateEnd?: (string | null),
    }): CancelablePromise<Paginated_GoSearchConsoleMetricRead_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/go/search/metric/{gsc_id}/{metric_type}',
            path: {
                'metric_type': metricType,
                'gsc_id': gscId,
            },
            query: {
                'page': page,
                'size': size,
                'metric_types': metricTypes,
                'date_start': dateStart,
                'date_end': dateEnd,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Go Search Console Property Metric:Create
     * Create a new google search console property metrics.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : create new google search console property metrics
     * for all clients
     *
     * `role=user` : create only google search console property metrics that
     * belong to any clients associated with the current user
     *
     * Returns:
     * --------
     * `GoSearchConsoleMetricRead` : the newly created google search console
     * property metric.
     * @returns GoSearchConsoleMetricRead Successful Response
     * @throws ApiError
     */
    public static goSearchConsolePropertyMetricCreateApiV1GoSearchMetricGscIdMetricTypePost({
        metricType,
        gscId,
        requestBody,
    }: {
        metricType: GoSearchConsoleMetricType,
        gscId: any,
        requestBody: GoSearchConsoleMetricCreate,
    }): CancelablePromise<GoSearchConsoleMetricRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/go/search/metric/{gsc_id}/{metric_type}',
            path: {
                'metric_type': metricType,
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
     * Go Search Console Property Metric:Read
     * Retrieve a single google search console property metric by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : read all google search console property metrics
     *
     * `role=user` : read only google search console property metrics that belong to
     * any clients associated with the current user
     *
     * Returns:
     * --------
     * `GoSearchConsoleMetricRead` : the google search console property metric matching
     * the metric_type and id
     * @returns GoSearchConsoleMetricRead Successful Response
     * @throws ApiError
     */
    public static goSearchConsolePropertyMetricReadApiV1GoSearchMetricGscIdMetricTypeMetricIdGet({
        gscId,
        metricType,
        metricId,
    }: {
        gscId: any,
        metricType: GoSearchConsoleMetricType,
        metricId: any,
    }): CancelablePromise<GoSearchConsoleMetricRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/go/search/metric/{gsc_id}/{metric_type}/{metric_id}',
            path: {
                'gsc_id': gscId,
                'metric_type': metricType,
                'metric_id': metricId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Go Search Console Property Metric:Update
     * Update a google search console property metric by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : update all google search console property metrics
     *
     * `role=user` : update only google search console property metrics that
     * belong to any clients associated with the current user
     *
     * Returns:
     * --------
     * `GoSearchConsoleMetricRead` : the updated google search console property metric
     * @returns GoSearchConsoleMetricRead Successful Response
     * @throws ApiError
     */
    public static goSearchConsolePropertyMetricUpdateApiV1GoSearchMetricGscIdMetricTypeMetricIdPatch({
        metricType,
        gscId,
        metricId,
        requestBody,
    }: {
        metricType: GoSearchConsoleMetricType,
        gscId: any,
        metricId: any,
        requestBody: GoSearchConsoleMetricUpdate,
    }): CancelablePromise<GoSearchConsoleMetricRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/go/search/metric/{gsc_id}/{metric_type}/{metric_id}',
            path: {
                'metric_type': metricType,
                'gsc_id': gscId,
                'metric_id': metricId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Go Search Console Property Metric:Delete
     * Delete a google search console property metric by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : delete any google search console property metrics
     *
     * `role=user` : delete only google search console property metrics that
     * belong to any clients associated with the current user
     *
     * Returns:
     * --------
     * `None`
     * @returns any Successful Response
     * @throws ApiError
     */
    public static goSearchConsolePropertyMetricDeleteApiV1GoSearchMetricGscIdMetricTypeMetricIdDelete({
        metricType,
        gscId,
        metricId,
    }: {
        metricType: GoSearchConsoleMetricType,
        gscId: any,
        metricId: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/go/search/metric/{gsc_id}/{metric_type}/{metric_id}',
            path: {
                'metric_type': metricType,
                'gsc_id': gscId,
                'metric_id': metricId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
