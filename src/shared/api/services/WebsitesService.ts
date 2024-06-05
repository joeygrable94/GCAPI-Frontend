/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paginated_WebsiteRead_ } from '../models/Paginated_WebsiteRead_';
import type { WebsiteCreate } from '../models/WebsiteCreate';
import type { WebsiteRead } from '../models/WebsiteRead';
import type { WebsiteUpdate } from '../models/WebsiteUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebsitesService {
    /**
     * Websites:List
     * Retrieve a paginated list of websites.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all websites
     *
     * `role=user` : only websites associated with the clients via `client_website`
     * that belong to the user via `user_client` table
     *
     * Returns:
     * --------
     * `Paginated[WebsiteRead]` : a paginated list of websites, optionally filtered
     * @returns Paginated_WebsiteRead_ Successful Response
     * @throws ApiError
     */
    public static websitesListApiV1WebsitesGet({
        page,
        size,
        clientId,
        websiteId,
    }: {
        page?: (number | null),
        size?: (number | null),
        clientId?: (string | null),
        websiteId?: (string | null),
    }): CancelablePromise<Paginated_WebsiteRead_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/websites/',
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
     * Websites:Create
     * Create a new website.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : create a new website
     *
     * Returns:
     * --------
     * `WebsiteRead` : the newly created website
     * @returns WebsiteRead Successful Response
     * @throws ApiError
     */
    public static websitesCreateApiV1WebsitesPost({
        requestBody,
    }: {
        requestBody: WebsiteCreate,
    }): CancelablePromise<WebsiteRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/websites/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Websites:Read
     * Retrieve a single website by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all websites
     *
     * `role=client` : only websites associated with the client via `client_website` table
     *
     * `role=employee` : only websites associated with clients they are associated with via
     * `user_client` table, and associated with the client via `client_website` table
     *
     * Returns:
     * --------
     * `WebsiteRead` : the website matching the website_id
     * @returns WebsiteRead Successful Response
     * @throws ApiError
     */
    public static websitesReadApiV1WebsitesWebsiteIdGet({
        websiteId,
    }: {
        websiteId: any,
    }): CancelablePromise<WebsiteRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/websites/{website_id}',
            path: {
                'website_id': websiteId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Websites:Update
     * Update a website by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all websites
     *
     * `role=client` : only websites associated with the client via `client_website` table
     *
     * `role=employee` : only websites associated with clients they are associated with via
     * `user_client` table, and associated with the client via `client_website` table
     *
     * Returns:
     * --------
     * `WebsiteRead` : the updated website
     * @returns WebsiteRead Successful Response
     * @throws ApiError
     */
    public static websitesUpdateApiV1WebsitesWebsiteIdPatch({
        websiteId,
        requestBody,
    }: {
        websiteId: any,
        requestBody: WebsiteUpdate,
    }): CancelablePromise<WebsiteRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/websites/{website_id}',
            path: {
                'website_id': websiteId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Websites:Delete
     * Delete a website by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all websites
     *
     * `role=client` : only websites associated with the client via `client_website` table
     *
     * `role=employee` : only websites associated with clients they are associated with via
     * `user_client` table, and associated with the client via `client_website` table
     *
     * Returns:
     * --------
     * `None`
     * @returns any Successful Response
     * @throws ApiError
     */
    public static websitesDeleteApiV1WebsitesWebsiteIdDelete({
        websiteId,
    }: {
        websiteId: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/websites/{website_id}',
            path: {
                'website_id': websiteId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
