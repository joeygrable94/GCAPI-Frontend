/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paginated_WebsiteMapRead_ } from '../models/Paginated_WebsiteMapRead_';
import type { WebsiteMapCreate } from '../models/WebsiteMapCreate';
import type { WebsiteMapProcessing } from '../models/WebsiteMapProcessing';
import type { WebsiteMapRead } from '../models/WebsiteMapRead';
import type { WebsiteMapUpdate } from '../models/WebsiteMapUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebsiteSitemapsService {
    /**
     * Website Sitemaps:List
     * Retrieve a paginated list of website maps.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all website maps
     *
     * `role=user` : only website maps with a website_id associated with the clients
     * via `client_website` table, associated with the user via `user_client` table
     *
     * Returns:
     * --------
     * `Paginated[WebsiteMapRead]` : a paginated list of website maps,
     * optionally filtered
     * @returns Paginated_WebsiteMapRead_ Successful Response
     * @throws ApiError
     */
    public static websiteSitemapsListApiV1SitemapsGet({
        page,
        size,
        websiteId,
        sitemapId,
    }: {
        page?: (number | null),
        size?: (number | null),
        websiteId?: (string | null),
        sitemapId?: (string | null),
    }): CancelablePromise<Paginated_WebsiteMapRead_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/sitemaps/',
            query: {
                'page': page,
                'size': size,
                'website_id': websiteId,
                'sitemap_id': sitemapId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Website Sitemaps:Create
     * Create a new website map.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : create a new website map
     *
     * `role=user` : create a new website map associated with a website that belongs to
     * a client the user belongs to via `user_client` table
     *
     * Returns:
     * --------
     * `WebsiteMapRead` : the newly created website map
     * @returns WebsiteMapRead Successful Response
     * @throws ApiError
     */
    public static websiteSitemapsCreateApiV1SitemapsPost({
        requestBody,
    }: {
        requestBody: WebsiteMapCreate,
    }): CancelablePromise<WebsiteMapRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/sitemaps/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Website Sitemaps:Read
     * Retrieve a single website map by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all website maps
     *
     * `role=user` : only website maps belonging to a website that belongs to a client
     * the user is associated with to via `user_client` table
     *
     * Returns:
     * --------
     * `WebsiteMapRead` : the website map
     * @returns WebsiteMapRead Successful Response
     * @throws ApiError
     */
    public static websiteSitemapsReadApiV1SitemapsSitemapIdGet({
        sitemapId,
    }: {
        sitemapId: any,
    }): CancelablePromise<WebsiteMapRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/sitemaps/{sitemap_id}',
            path: {
                'sitemap_id': sitemapId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Website Sitemaps:Update
     * Update a website map by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all website maps
     *
     * `role=user` : only website maps belonging to a website that belongs to a client
     * the user is associated with to via `user_client` table
     *
     * Returns:
     * --------
     * `WebsiteMapRead` : the updated website map
     * @returns WebsiteMapRead Successful Response
     * @throws ApiError
     */
    public static websiteSitemapsUpdateApiV1SitemapsSitemapIdPatch({
        sitemapId,
        requestBody,
    }: {
        sitemapId: any,
        requestBody: WebsiteMapUpdate,
    }): CancelablePromise<WebsiteMapRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/sitemaps/{sitemap_id}',
            path: {
                'sitemap_id': sitemapId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Website Sitemaps:Delete
     * Delete a website map by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all website maps
     *
     * `role=user` : only website maps belonging to a website that belongs to a client
     * the user is associated with to via `user_client` table
     *
     * Returns:
     * --------
     * `None`
     * @returns any Successful Response
     * @throws ApiError
     */
    public static websiteSitemapsDeleteApiV1SitemapsSitemapIdDelete({
        sitemapId,
    }: {
        sitemapId: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/sitemaps/{sitemap_id}',
            path: {
                'sitemap_id': sitemapId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Website Sitemaps:Process Sitemap Pages
     * A webhook to initiate processing a sitemap's pages.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all website maps
     *
     * `role=user` : only website maps belonging to a website that belongs to a client
     * the user is associated with to via `user_client` table
     *
     * Returns:
     * --------
     * `WebsiteMapProcessing` : the task_id of the worker task
     * @returns WebsiteMapProcessing Successful Response
     * @throws ApiError
     */
    public static websiteSitemapsProcessSitemapPagesApiV1SitemapsSitemapIdProcessPagesGet({
        sitemapId,
    }: {
        sitemapId: any,
    }): CancelablePromise<WebsiteMapProcessing> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/sitemaps/{sitemap_id}/process-pages',
            path: {
                'sitemap_id': sitemapId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
