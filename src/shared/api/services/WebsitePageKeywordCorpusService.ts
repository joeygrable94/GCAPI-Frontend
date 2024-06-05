/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paginated_WebsiteKeywordCorpusRead_ } from '../models/Paginated_WebsiteKeywordCorpusRead_';
import type { WebsiteKeywordCorpusCreate } from '../models/WebsiteKeywordCorpusCreate';
import type { WebsiteKeywordCorpusRead } from '../models/WebsiteKeywordCorpusRead';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebsitePageKeywordCorpusService {
    /**
     * Website Page Keyword Corpus:List
     * Retrieve a paginated list of website keyword corpus.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all website keyword corpus
     *
     * `role=client` : only website keyword corpus with a website_id associated with
     * the client via `client_website` table
     *
     * `role=employee` : only website keyword corpus with a website_id associated
     * with a client's website via `client_website` table, associated with the user
     * via `user_client`
     *
     * Returns:
     * --------
     * `Paginated[WebsiteKeywordCorpusRead]` : a paginated list of website keyword corpus,
     * optionally filtered
     * @returns Paginated_WebsiteKeywordCorpusRead_ Successful Response
     * @throws ApiError
     */
    public static websitePageKeywordCorpusListApiV1KwcGet({
        page,
        size,
        websiteId,
        pageId,
    }: {
        page?: (number | null),
        size?: (number | null),
        websiteId?: (string | null),
        pageId?: (string | null),
    }): CancelablePromise<Paginated_WebsiteKeywordCorpusRead_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kwc/',
            query: {
                'page': page,
                'size': size,
                'website_id': websiteId,
                'page_id': pageId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Website Page Keyword Corpus:Create
     * Create a new website keyword corpus.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : create a new website keyword corpus
     *
     * `role=client` : create a new website keyword corpus that belongs to a website
     * associated with the client via `client_website` table
     *
     * `role=employee` : create a new website keyword corpus that belongs to a website
     * associated with a client via `client_website` table, associated with the user
     * via the `user_client` table
     *
     * Returns:
     * --------
     * `WebsiteKeywordCorpusRead` : the newly created website keyword corpus
     * @returns WebsiteKeywordCorpusRead Successful Response
     * @throws ApiError
     */
    public static websitePageKeywordCorpusCreateApiV1KwcPost({
        requestBody,
    }: {
        requestBody: WebsiteKeywordCorpusCreate,
    }): CancelablePromise<WebsiteKeywordCorpusRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/kwc/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Website Page Keyword Corpus:Read
     * Retrieve a single website keyword corpus by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : read any website keyword corpus
     *
     * `role=client` : read any website keyword corpus that belongs to a website
     * associated with the client via `client_website` table
     *
     * `role=employee` : read any website keyword corpus that belongs to a website
     * associated with a client via `client_website` table, associated with the user
     * via the `user_client` table
     *
     * Returns:
     * --------
     * `WebsiteKeywordCorpusRead` : the website keyword corpus requested by kwc_id
     * @returns WebsiteKeywordCorpusRead Successful Response
     * @throws ApiError
     */
    public static websitePageKeywordCorpusReadApiV1KwcKwcIdGet({
        kwcId,
    }: {
        kwcId: any,
    }): CancelablePromise<WebsiteKeywordCorpusRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kwc/{kwc_id}',
            path: {
                'kwc_id': kwcId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Website Page Keyword Corpus:Delete
     * Delete a single website keyword corpus by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : delete any website keyword corpus
     *
     * `role=client` : delete any website keyword corpus that belongs to a website
     * associated with the client via `client_website` table
     *
     * `role=employee` : delete any website keyword corpus that belongs to a website
     * associated with a client via `client_website` table, associated with the user
     * via the `user_client` table
     *
     * Returns:
     * --------
     * `None`
     * @returns any Successful Response
     * @throws ApiError
     */
    public static websitePageKeywordCorpusDeleteApiV1KwcKwcIdDelete({
        kwcId,
    }: {
        kwcId: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/kwc/{kwc_id}',
            path: {
                'kwc_id': kwcId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
