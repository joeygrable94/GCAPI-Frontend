/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paginated_UserReadAsAdmin_ } from '../models/Paginated_UserReadAsAdmin_';
import type { Paginated_UserReadAsManager_ } from '../models/Paginated_UserReadAsManager_';
import type { UserRead } from '../models/UserRead';
import type { UserReadAsAdmin } from '../models/UserReadAsAdmin';
import type { UserReadAsManager } from '../models/UserReadAsManager';
import type { UserUpdate } from '../models/UserUpdate';
import type { UserUpdateAsAdmin } from '../models/UserUpdateAsAdmin';
import type { UserUpdateAsManager } from '../models/UserUpdateAsManager';
import type { UserUpdatePrivileges } from '../models/UserUpdatePrivileges';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
  /**
   * Users:Current
   * Retrieve the profile information about the currently active, verified user.
   *
   * Permissions:
   * ------------
   * anyone can access this endpoint
   *
   * Returns:
   * --------
   * a dictionary containing the user profile information
   *
   * - `UserReadAsAdmin` : all fields
   * - `UserReadAsManager` : only fields accessible to the manager role
   * - `UserRead` : only publically accessible fields
   * @returns any Successful Response
   * @throws ApiError
   */
  public static usersCurrentApiV1UsersMeGet(): CancelablePromise<(UserReadAsAdmin | UserReadAsManager | UserRead)> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/me',
    });
  }
  /**
   * Users:List
   * Retrieve a paginated list of users.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all users
   *
   * Returns:
   * --------
   * a paginated response containing a list of users
   *
   * - `Paginated[UserReadAsAdmin]` : all fields
   * - `Paginated[UserReadAsManager]` : only fields accessibile to the
   * manager role
   * @returns any Successful Response
   * @throws ApiError
   */
  public static usersListApiV1UsersGet({
    page,
    size,
  }: {
    page?: (number | null),
    size?: (number | null),
  }): CancelablePromise<(Paginated_UserReadAsAdmin_ | Paginated_UserReadAsManager_)> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/',
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
   * Users:Read
   * Retrieve a single user by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all users
   *
   * `role=client` : all users associated with the client through the `user_client`
   * table
   *
   * `role=employee` : all users associated with any clients they are associated with
   * through the `user_client`
   *
   * `role=user` : only their own user profile id
   *
   * Returns:
   * --------
   * a dictionary containing the user profile information
   *
   * - `UserReadAsAdmin` : all fields
   * - `UserReadAsManager` : only fields accessible to the manager role
   * - `UserRead` : only publically accessible fields
   * @returns any Successful Response
   * @throws ApiError
   */
  public static usersReadApiV1UsersUserIdGet({
    userId,
  }: {
    userId: any,
  }): CancelablePromise<(UserReadAsAdmin | UserReadAsManager | UserRead)> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/{user_id}',
      path: {
        'user_id': userId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Users:Update
   * Update a user by id. Users may update limited fields of their own data,
   * and maybe the fields of other users depending on their role.
   *
   * Permissions:
   * ------------
   * `role=admin` : all users, all fields
   *
   * `role=manager` : all users, limited fields
   *
   * `role=user` : only their own public profile fields
   *
   * Returns:
   * --------
   * the updated user object
   *
   * - `UserReadAsAdmin` : all fields
   * - `UserReadAsManager` : only fields accessible to the manager role
   * - `UserRead` : only publically accessible fields
   * @returns any Successful Response
   * @throws ApiError
   */
  public static usersUpdateApiV1UsersUserIdPatch({
    userId,
    requestBody,
  }: {
    userId: any,
    requestBody: (UserUpdateAsAdmin | UserUpdateAsManager | UserUpdate),
  }): CancelablePromise<(UserReadAsAdmin | UserReadAsManager | UserRead)> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/users/{user_id}',
      path: {
        'user_id': userId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Users:Delete
   * Delete a user by id.
   *
   * Permissions:
   * ------------
   * `role=admin` : all users
   *
   * `role=user` : may request to have their profile and all associated data deleted
   *
   * Returns:
   * --------
   * `UserDelete` : a message indicating the user was deleted or requested to be
   * deleted with the user id and corresponding task id
   * @returns any Successful Response
   * @throws ApiError
   */
  public static usersDeleteApiV1UsersUserIdDelete({
    userId,
  }: {
    userId: any,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/users/{user_id}',
      path: {
        'user_id': userId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Users:Add Privileges
   * Add privileges to a user by id.
   *
   * Permissions:
   * ------------
   * `role=admin` : all users
   *
   * `role=manager` : cannot add the RoleAdmin privilege
   *
   * Returns:
   * --------
   * the updated user object
   *
   * - `UserReadAsAdmin` : all fields
   * - `UserReadAsManager` : only fields accessible to the manager role
   * @returns any Successful Response
   * @throws ApiError
   */
  public static usersAddPrivilegesApiV1UsersUserIdPrivilegesAddPost({
    userId,
    requestBody,
  }: {
    userId: any,
    requestBody: UserUpdatePrivileges,
  }): CancelablePromise<(UserReadAsAdmin | UserReadAsManager)> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/users/{user_id}/privileges/add',
      path: {
        'user_id': userId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Users:Remove Privileges
   * Remove privileges from a user by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all users
   *
   * Returns:
   * --------
   * the updated user object
   *
   * - `UserReadAsAdmin` : all fields
   * - `UserReadAsManager` : only fields accessible to the manager role
   * @returns any Successful Response
   * @throws ApiError
   */
  public static usersRemovePrivilegesApiV1UsersUserIdPrivilegesRemovePost({
    userId,
    requestBody,
  }: {
    userId: any,
    requestBody: UserUpdatePrivileges,
  }): CancelablePromise<(UserReadAsAdmin | UserReadAsManager)> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/users/{user_id}/privileges/remove',
      path: {
        'user_id': userId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
