/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserAdmin } from '../models/UserAdmin';
import type { UserCreate } from '../models/UserCreate';
import type { UserRead } from '../models/UserRead';
import type { UserUpdate } from '../models/UserUpdate';
import type { UserUpdateAuthPermissions } from '../models/UserUpdateAuthPermissions';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

  /**
   * Users:Current User
   * Allows current-active-verified-users to fetch the details on their account.
   * @returns any Successful Response
   * @throws ApiError
   */
  public static usersCurrentUserApiV1UsersMeGet(): CancelablePromise<(UserAdmin | UserRead)> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/me',
      errors: {
        401: `Unauthorized`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Users:Patch Current User
   * Allows current-active-verified-users to update their account.
   * @returns any Successful Response
   * @throws ApiError
   */
  public static usersPatchCurrentUserApiV1UsersMePatch({
    requestBody,
  }: {
    requestBody: UserUpdate,
  }): CancelablePromise<(UserAdmin | UserRead)> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/users/me',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        404: `Not Found`,
        422: `Validation Error`,
      },
    });
  }

  /**
   * Users:List Users
   * Allows current-active-verified-superusers to fetch a list of users
   * in a paginated output.
   *
   * The default number of users per page is configured in the settings.
   * @returns any Successful Response
   * @throws ApiError
   */
  public static usersListUsersApiV1UsersGet({
    page = 1,
  }: {
    page?: number,
  }): CancelablePromise<(Array<UserAdmin> | Array<UserRead>)> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/',
      query: {
        'page': page,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        422: `Validation Error`,
      },
    });
  }

  /**
   * Users:Create User
   * Creates a new user, un-verified by default.
   * @returns any Successful Response
   * @throws ApiError
   */
  public static usersCreateUserApiV1UsersPost({
    requestBody,
  }: {
    requestBody: UserCreate,
  }): CancelablePromise<(UserAdmin | UserRead)> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/users/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Users:User
   * Allows current-active-verified-superusers may fetch a spectific user
   * by their ID/UUID attribute.
   *
   * We do not want to be sending sending requests with user emails,
   * leaving them potential at risk of being exposed to the public.
   * @returns any Successful Response
   * @throws ApiError
   */
  public static usersUserApiV1UsersIdGet({
    id,
  }: {
    id: any,
  }): CancelablePromise<(UserAdmin | UserRead)> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/{id}',
      path: {
        'id': id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        422: `Validation Error`,
      },
    });
  }

  /**
   * Users:Delete User
   * Allows current-active-verified-superusers to delete a user
   * by their ID/UUID attribute.
   * @returns void
   * @throws ApiError
   */
  public static usersDeleteUserApiV1UsersIdDelete({
    id,
  }: {
    id: any,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/users/{id}',
      path: {
        'id': id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        422: `Validation Error`,
      },
    });
  }

  /**
   * Users:Update User
   * Allows current-active-verified-superusers to request to update a user
   * by their ID/UUID attribute.
   * @returns any Successful Response
   * @throws ApiError
   */
  public static usersUpdateUserApiV1UsersIdPatch({
    id,
    requestBody,
  }: {
    id: any,
    requestBody: UserUpdate,
  }): CancelablePromise<(UserAdmin | UserRead)> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/users/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        422: `Validation Error`,
      },
    });
  }

  /**
   * Users:Add Permissions To User
   * @returns UserAdmin Successful Response
   * @throws ApiError
   */
  public static usersAddPermissionsToUserApiV1UsersIdPermissionsAddPatch({
    id,
    requestBody,
  }: {
    id: any,
    requestBody: UserUpdateAuthPermissions,
  }): CancelablePromise<UserAdmin> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/users/{id}/permissions/add',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Users:Remove Permissions From User
   * @returns UserAdmin Successful Response
   * @throws ApiError
   */
  public static usersRemovePermissionsFromUserApiV1UsersIdPermissionsRemovePatch({
    id,
    requestBody,
  }: {
    id: any,
    requestBody: UserUpdateAuthPermissions,
  }): CancelablePromise<UserAdmin> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/users/{id}/permissions/remove',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
