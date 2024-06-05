/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NoteCreate } from '../models/NoteCreate';
import type { NoteRead } from '../models/NoteRead';
import type { NoteUpdate } from '../models/NoteUpdate';
import type { Paginated_NoteRead_ } from '../models/Paginated_NoteRead_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotesService {
    /**
     * Notes:List
     * Retrieve a paginated list of notes.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : all notes
     *
     * `role=user` : only notes that belong to the user
     *
     * Returns:
     * --------
     * `Paginated[NoteRead]` : a paginated list of notes, optionally filtered
     * @returns Paginated_NoteRead_ Successful Response
     * @throws ApiError
     */
    public static notesListApiV1NotesGet({
        page,
        size,
        userId,
    }: {
        page?: (number | null),
        size?: (number | null),
        userId?: (string | null),
    }): CancelablePromise<Paginated_NoteRead_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/notes/',
            query: {
                'page': page,
                'size': size,
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Notes:Create
     * Create a new note.
     *
     * Permissions:
     * ------------
     * any `role` : create a new note, notes belong to one user
     *
     * Returns:
     * --------
     * `NoteRead` : the newly created note
     * @returns NoteRead Successful Response
     * @throws ApiError
     */
    public static notesCreateApiV1NotesPost({
        requestBody,
    }: {
        requestBody: NoteCreate,
    }): CancelablePromise<NoteRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/notes/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Notes:Read
     * Retrieve a single note by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : read all notes
     *
     * `role=user` : read only notes that belong to the user
     *
     * Returns:
     * --------
     * `NoteRead` : the note matching the note_id
     * @returns NoteRead Successful Response
     * @throws ApiError
     */
    public static notesReadApiV1NotesNoteIdGet({
        noteId,
    }: {
        noteId: any,
    }): CancelablePromise<NoteRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/notes/{note_id}',
            path: {
                'note_id': noteId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Notes:Update
     * Update a note by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : update all notes
     *
     * `role=user` : update only notes that belong to the user
     *
     * Returns:
     * --------
     * `NoteRead` : the updated note
     * @returns NoteRead Successful Response
     * @throws ApiError
     */
    public static notesUpdateApiV1NotesNoteIdPatch({
        noteId,
        requestBody,
    }: {
        noteId: any,
        requestBody: NoteUpdate,
    }): CancelablePromise<NoteRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/notes/{note_id}',
            path: {
                'note_id': noteId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Notes:Delete
     * Delete a note by id.
     *
     * Permissions:
     * ------------
     * `role=admin|manager` : delete all notes
     *
     * `role=user` : delete only notes that belong to the user
     *
     * Returns:
     * --------
     * `None`
     * @returns any Successful Response
     * @throws ApiError
     */
    public static notesDeleteApiV1NotesNoteIdDelete({
        noteId,
    }: {
        noteId: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/notes/{note_id}',
            path: {
                'note_id': noteId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
