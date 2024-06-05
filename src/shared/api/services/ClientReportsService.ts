/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientReportCreate } from '../models/ClientReportCreate';
import type { ClientReportRead } from '../models/ClientReportRead';
import type { ClientReportUpdate } from '../models/ClientReportUpdate';
import type { NoteCreate } from '../models/NoteCreate';
import type { NoteRead } from '../models/NoteRead';
import type { Paginated_ClientReportRead_ } from '../models/Paginated_ClientReportRead_';
import type { Paginated_NoteRead_ } from '../models/Paginated_NoteRead_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClientReportsService {
    /**
     * Client Reports:List
     * Retrieve a paginated list of client reports.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all client report
     *
     * `role=user` : only client reports associated with the current user
     *
     * Returns:
     * --------
     * `Paginated[ClientReportRead]` : a paginated list of client reports,
     * optionally filtered
     * @returns Paginated_ClientReportRead_ Successful Response
     * @throws ApiError
     */
    public static clientReportsListApiV1ClientsReportsClientIdGet({
        clientId,
        page,
        size,
    }: {
        clientId: any,
        page?: (number | null),
        size?: (number | null),
    }): CancelablePromise<Paginated_ClientReportRead_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/clients/reports/{client_id}',
            path: {
                'client_id': clientId,
            },
            query: {
                'page': page,
                'size': size,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Client Reports:Create
     * Create a new client report.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : create a new client report for all clients
     *
     * `role=user` : create only client reports associated with the current user
     *
     * Returns:
     * --------
     * `ClientReportRead` : the newly created client
     * @returns ClientReportRead Successful Response
     * @throws ApiError
     */
    public static clientReportsCreateApiV1ClientsReportsClientIdPost({
        clientId,
        requestBody,
    }: {
        clientId: any,
        requestBody: ClientReportCreate,
    }): CancelablePromise<ClientReportRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/clients/reports/{client_id}',
            path: {
                'client_id': clientId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Client Reports:Read
     * Retrieve a single client report by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all client reports
     *
     * `role=user` : only client reports associated with the current user
     *
     * Returns:
     * --------
     * `ClientReportRead` : a client report matching the client_id
     * @returns ClientReportRead Successful Response
     * @throws ApiError
     */
    public static clientReportsReadApiV1ClientsReportsClientIdReportIdGet({
        clientId,
        reportId,
    }: {
        clientId: any,
        reportId: any,
    }): CancelablePromise<ClientReportRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/clients/reports/{client_id}/{report_id}',
            path: {
                'client_id': clientId,
                'report_id': reportId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Client Reports:Update
     * Update a client report by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all client reports
     *
     * `role=user` : only client reports associated with the current user
     *
     * Returns:
     * --------
     * `ClientReportRead` : the updated client report
     * @returns ClientReportRead Successful Response
     * @throws ApiError
     */
    public static clientReportsUpdateApiV1ClientsReportsClientIdReportIdPatch({
        clientId,
        reportId,
        requestBody,
    }: {
        clientId: any,
        reportId: any,
        requestBody: ClientReportUpdate,
    }): CancelablePromise<ClientReportRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/clients/reports/{client_id}/{report_id}',
            path: {
                'client_id': clientId,
                'report_id': reportId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Client Reports:Delete
     * Delete a client report by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : delete any client reports
     *
     * `role=user` : delete only client reports associated with the current user
     *
     * Returns:
     * --------
     * `None`
     * @returns any Successful Response
     * @throws ApiError
     */
    public static clientReportsDeleteApiV1ClientsReportsClientIdReportIdDelete({
        clientId,
        reportId,
    }: {
        clientId: any,
        reportId: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/clients/reports/{client_id}/{report_id}',
            path: {
                'client_id': clientId,
                'report_id': reportId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Client Report Notes:List
     * Creates a new note and assigns it to the client report.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all client report notes
     *
     * `role=user` : only client report notes associated with the current user
     *
     * Returns:
     * --------
     * `Paginated[NoteRead]` : paginated list of client report notes
     * @returns Paginated_NoteRead_ Successful Response
     * @throws ApiError
     */
    public static clientReportNotesListApiV1ClientsReportsClientIdReportIdNotesGet({
        clientId,
        reportId,
        page,
        size,
    }: {
        clientId: any,
        reportId: any,
        page?: (number | null),
        size?: (number | null),
    }): CancelablePromise<Paginated_NoteRead_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/clients/reports/{client_id}/{report_id}/notes',
            path: {
                'client_id': clientId,
                'report_id': reportId,
            },
            query: {
                'page': page,
                'size': size,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Client Report Notes:Create
     * Creates a new note and assigns it to the client report.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all client report notes
     *
     * `role=user` : only client report notes associated with the current user
     *
     * Returns:
     * --------
     * `NoteRead` : the client report note created
     * @returns NoteRead Successful Response
     * @throws ApiError
     */
    public static clientReportNotesCreateApiV1ClientsReportsClientIdReportIdNotesPost({
        clientId,
        reportId,
        requestBody,
    }: {
        clientId: any,
        reportId: any,
        requestBody: NoteCreate,
    }): CancelablePromise<NoteRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/clients/reports/{client_id}/{report_id}/notes',
            path: {
                'client_id': clientId,
                'report_id': reportId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
