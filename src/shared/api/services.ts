import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type {
  PublicData,
  SecurityData,
  TasksData,
  UsersData,
  ClientsData,
  ClientReportsData,
  NotesData,
  BdxFeedsData,
  SharpSpringAccountsData,
  GoogleCloudAccountsData,
  GoogleAnalytics4PropertiesData,
  GoogleAnalytics4PropertyStreamsData,
  GoogleSearchConsolePropertiesData,
  GoogleSearchConsolePropertyMetricsData,
  WebsitesData,
  WebsitePagesData,
  WebsiteSitemapsData,
  WebsitePageSpeedInsightsData,
  WebsitePageKeywordCorpusData
} from './models';

export class PublicService {
  /**
   * Public:Status
   * Retrieve the status of the API.
   *
   * Permissions:
   * ------------
   * anyone can access this endpoint
   *
   * Returns:
   * --------
   * `Dict[str, Any]` : a dictionary containing the status of the API
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static publicStatusApiV1StatusGet(
    data: PublicData['payloads']['PublicStatusApiV1StatusGet'] = {}
  ): CancelablePromise<PublicData['responses']['PublicStatusApiV1StatusGet']> {
    const { message } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/status',
      query: {
        message
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Public:Rate Limited Multiple
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static publicRateLimitedMultipleApiV1RateLimitedMultipleGet(
    data: PublicData['payloads']['PublicRateLimitedMultipleApiV1RateLimitedMultipleGet'] = {}
  ): CancelablePromise<
    PublicData['responses']['PublicRateLimitedMultipleApiV1RateLimitedMultipleGet']
  > {
    const { message } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/rate-limited-multiple',
      query: {
        message
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}

export class SecurityService {
  /**
   * Secure:Test Security Scope
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static secureTestSecurityScopeApiV1TestScopeGet(): CancelablePromise<
    SecurityData['responses']['SecureTestSecurityScopeApiV1TestScopeGet']
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/test-scope'
    });
  }

  /**
   * Secure:Get Csrf
   * Generates an secure CSRF token for the API.
   *
   * Permissions:
   * ------------
   * anyone can access this endpoint
   *
   * Returns:
   * --------
   * `Dict[str, Any]` : a dictionary containing the CSRF token for the API
   * @returns CsrfToken Successful Response
   * @throws ApiError
   */
  public static secureGetCsrfApiV1CsrfGet(): CancelablePromise<
    SecurityData['responses']['SecureGetCsrfApiV1CsrfGet']
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/csrf'
    });
  }

  /**
   * Secure:Check Csrf
   * Verifies an secure CSRF token for the API.
   *
   * Permissions:
   * ------------
   * anyone can access this endpoint
   *
   * Returns:
   * --------
   * `Dict[str, Any]` : a dictionary containing the CSRF token for the API
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static secureCheckCsrfApiV1CsrfPost(): CancelablePromise<
    SecurityData['responses']['SecureCheckCsrfApiV1CsrfPost']
  > {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/csrf'
    });
  }

  /**
   * Secure:Secure Encrypt Message
   * Encrypts a message using AES signed by an RSA key.
   * @returns EncryptedMessage Successful Response
   * @throws ApiError
   */
  public static secureSecureEncryptMessageApiV1EncryptMessagePost(
    data: SecurityData['payloads']['SecureSecureEncryptMessageApiV1EncryptMessagePost']
  ): CancelablePromise<
    SecurityData['responses']['SecureSecureEncryptMessageApiV1EncryptMessagePost']
  > {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/encrypt/message',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Secure:Secure Decrypt Message
   * Decrypts and verifies the RSA signature of a securely encrypted message.
   * @returns PlainMessage Successful Response
   * @throws ApiError
   */
  public static secureSecureDecryptMessageApiV1DecryptMessagePost(
    data: SecurityData['payloads']['SecureSecureDecryptMessageApiV1DecryptMessagePost']
  ): CancelablePromise<
    SecurityData['responses']['SecureSecureDecryptMessageApiV1DecryptMessagePost']
  > {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/decrypt/message',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }
}

export class TasksService {
  /**
   * Tasks:Get Status
   * Retrieve the status of a task by task_id.
   *
   * Permissions:
   * ------------
   * `role=user` : all tasks
   *
   * Returns:
   * --------
   * `TaskState` : a dictionary containing the worker task id, status,
   * and maybe the result
   * @returns TaskState Successful Response
   * @throws ApiError
   */
  public static tasksGetStatusApiV1TasksTaskIdGet(
    data: TasksData['payloads']['TasksGetStatusApiV1TasksTaskIdGet']
  ): CancelablePromise<TasksData['responses']['TasksGetStatusApiV1TasksTaskIdGet']> {
    const { taskId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/tasks/{task_id}',
      path: {
        task_id: taskId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}

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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static usersCurrentApiV1UsersMeGet(): CancelablePromise<
    UsersData['responses']['UsersCurrentApiV1UsersMeGet']
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/me'
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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static usersListApiV1UsersGet(
    data: UsersData['payloads']['UsersListApiV1UsersGet'] = {}
  ): CancelablePromise<UsersData['responses']['UsersListApiV1UsersGet']> {
    const { page, size } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/',
      query: {
        page,
        size
      },
      errors: {
        422: `Validation Error`
      }
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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static usersReadApiV1UsersUserIdGet(
    data: UsersData['payloads']['UsersReadApiV1UsersUserIdGet']
  ): CancelablePromise<UsersData['responses']['UsersReadApiV1UsersUserIdGet']> {
    const { userId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/{user_id}',
      path: {
        user_id: userId
      },
      errors: {
        422: `Validation Error`
      }
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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static usersUpdateApiV1UsersUserIdPatch(
    data: UsersData['payloads']['UsersUpdateApiV1UsersUserIdPatch']
  ): CancelablePromise<UsersData['responses']['UsersUpdateApiV1UsersUserIdPatch']> {
    const { userId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/users/{user_id}',
      path: {
        user_id: userId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static usersDeleteApiV1UsersUserIdDelete(
    data: UsersData['payloads']['UsersDeleteApiV1UsersUserIdDelete']
  ): CancelablePromise<UsersData['responses']['UsersDeleteApiV1UsersUserIdDelete']> {
    const { userId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/users/{user_id}',
      path: {
        user_id: userId
      },
      errors: {
        422: `Validation Error`
      }
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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static usersAddPrivilegesApiV1UsersUserIdPrivilegesAddPost(
    data: UsersData['payloads']['UsersAddPrivilegesApiV1UsersUserIdPrivilegesAddPost']
  ): CancelablePromise<
    UsersData['responses']['UsersAddPrivilegesApiV1UsersUserIdPrivilegesAddPost']
  > {
    const { userId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/users/{user_id}/privileges/add',
      path: {
        user_id: userId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static usersRemovePrivilegesApiV1UsersUserIdPrivilegesRemovePost(
    data: UsersData['payloads']['UsersRemovePrivilegesApiV1UsersUserIdPrivilegesRemovePost']
  ): CancelablePromise<
    UsersData['responses']['UsersRemovePrivilegesApiV1UsersUserIdPrivilegesRemovePost']
  > {
    const { userId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/users/{user_id}/privileges/remove',
      path: {
        user_id: userId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }
}

export class ClientsService {
  /**
   * Clients:List
   * Retrieve a paginated list of clients.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all clients
   *
   * `role=user` : only clients associated with the user via `user_client`
   * table
   *
   * Returns:
   * --------
   * `Paginated[ClientRead]` : a paginated list of clients, optionally filtered
   * @returns Paginated_ClientRead_ Successful Response
   * @throws ApiError
   */
  public static clientsListApiV1ClientsGet(
    data: ClientsData['payloads']['ClientsListApiV1ClientsGet'] = {}
  ): CancelablePromise<ClientsData['responses']['ClientsListApiV1ClientsGet']> {
    const { page, size, userId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/clients/',
      query: {
        page,
        size,
        user_id: userId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Clients:Create
   * Create a new client.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : create a new client
   *
   * Returns:
   * --------
   * `ClientRead` : the newly created client
   * @returns ClientRead Successful Response
   * @throws ApiError
   */
  public static clientsCreateApiV1ClientsPost(
    data: ClientsData['payloads']['ClientsCreateApiV1ClientsPost']
  ): CancelablePromise<ClientsData['responses']['ClientsCreateApiV1ClientsPost']> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/clients/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Clients:Read
   * Retrieve a single client by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all clients
   *
   * `role=user` : only clients associated with the user via `user_client`
   *
   * Returns:
   * --------
   * `ClientRead` : a client matching the client_id
   * @returns ClientRead Successful Response
   * @throws ApiError
   */
  public static clientsReadApiV1ClientsClientIdGet(
    data: ClientsData['payloads']['ClientsReadApiV1ClientsClientIdGet']
  ): CancelablePromise<ClientsData['responses']['ClientsReadApiV1ClientsClientIdGet']> {
    const { clientId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/clients/{client_id}',
      path: {
        client_id: clientId
      },
      errors: {
        404: `Not Found`,
        422: `Validation Error`
      }
    });
  }

  /**
   * Clients:Update
   * Update a client by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all clients
   *
   * `role=user` : only clients associated with the user via `user_client`
   *
   * Returns:
   * --------
   * `ClientRead` : the updated client
   * @returns ClientRead Successful Response
   * @throws ApiError
   */
  public static clientsUpdateApiV1ClientsClientIdPatch(
    data: ClientsData['payloads']['ClientsUpdateApiV1ClientsClientIdPatch']
  ): CancelablePromise<
    ClientsData['responses']['ClientsUpdateApiV1ClientsClientIdPatch']
  > {
    const { clientId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/clients/{client_id}',
      path: {
        client_id: clientId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Clients:Delete
   * Delete a client by id.
   *
   * Permissions:
   * ------------
   * `role=admin` : all clients
   *
   * `role=client` : may request to have their client data deleted
   *
   * Returns:
   * --------
   * `ClientDelete` : a message indicating the user deleted a client or if a user
   * requested to delete a client they are associated with
   * @returns ClientDelete Successful Response
   * @throws ApiError
   */
  public static clientsDeleteApiV1ClientsClientIdDelete(
    data: ClientsData['payloads']['ClientsDeleteApiV1ClientsClientIdDelete']
  ): CancelablePromise<
    ClientsData['responses']['ClientsDeleteApiV1ClientsClientIdDelete']
  > {
    const { clientId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/clients/{client_id}',
      path: {
        client_id: clientId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Clients:Assign User
   * Assigns a user to a client.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : ...
   *
   * Returns:
   * --------
   * `UserClientRead` : the user client relationship that was created
   * @returns UserClientRead Successful Response
   * @throws ApiError
   */
  public static clientsAssignUserApiV1ClientsClientIdAssignUserPost(
    data: ClientsData['payloads']['ClientsAssignUserApiV1ClientsClientIdAssignUserPost']
  ): CancelablePromise<
    ClientsData['responses']['ClientsAssignUserApiV1ClientsClientIdAssignUserPost']
  > {
    const { clientId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/clients/{client_id}/assign/user',
      path: {
        client_id: clientId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Clients:Remove User
   * Removes a user from a client.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : ...
   *
   * Returns:
   * --------
   * `UserClientRead` : the user client relationship that was deleted
   * @returns UserClientRead Successful Response
   * @throws ApiError
   */
  public static clientsRemoveUserApiV1ClientsClientIdRemoveUserPost(
    data: ClientsData['payloads']['ClientsRemoveUserApiV1ClientsClientIdRemoveUserPost']
  ): CancelablePromise<
    ClientsData['responses']['ClientsRemoveUserApiV1ClientsClientIdRemoveUserPost']
  > {
    const { clientId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/clients/{client_id}/remove/user',
      path: {
        client_id: clientId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Clients:Assign Website
   * Assigns a website to a client.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : ...
   *
   * Returns:
   * --------
   * `ClientWebsiteRead` : the client website relationship that was deleted
   * @returns ClientWebsiteRead Successful Response
   * @throws ApiError
   */
  public static clientsAssignWebsiteApiV1ClientsClientIdAssignWebsitePost(
    data: ClientsData['payloads']['ClientsAssignWebsiteApiV1ClientsClientIdAssignWebsitePost']
  ): CancelablePromise<
    ClientsData['responses']['ClientsAssignWebsiteApiV1ClientsClientIdAssignWebsitePost']
  > {
    const { clientId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/clients/{client_id}/assign/website',
      path: {
        client_id: clientId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Clients:Remove Website
   * Removes a website from a client.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : ...
   *
   * Returns:
   * --------
   * `ClientWebsiteRead` : the client website relationship that was deleted
   * @returns ClientWebsiteRead Successful Response
   * @throws ApiError
   */
  public static clientsRemoveWebsiteApiV1ClientsClientIdRemoveWebsitePost(
    data: ClientsData['payloads']['ClientsRemoveWebsiteApiV1ClientsClientIdRemoveWebsitePost']
  ): CancelablePromise<
    ClientsData['responses']['ClientsRemoveWebsiteApiV1ClientsClientIdRemoveWebsitePost']
  > {
    const { clientId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/clients/{client_id}/remove/website',
      path: {
        client_id: clientId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }
}

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
  public static clientReportsListApiV1ClientsReportsClientIdGet(
    data: ClientReportsData['payloads']['ClientReportsListApiV1ClientsReportsClientIdGet']
  ): CancelablePromise<
    ClientReportsData['responses']['ClientReportsListApiV1ClientsReportsClientIdGet']
  > {
    const { clientId, page, size } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/clients/reports/{client_id}',
      path: {
        client_id: clientId
      },
      query: {
        page,
        size
      },
      errors: {
        422: `Validation Error`
      }
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
  public static clientReportsCreateApiV1ClientsReportsClientIdPost(
    data: ClientReportsData['payloads']['ClientReportsCreateApiV1ClientsReportsClientIdPost']
  ): CancelablePromise<
    ClientReportsData['responses']['ClientReportsCreateApiV1ClientsReportsClientIdPost']
  > {
    const { clientId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/clients/reports/{client_id}',
      path: {
        client_id: clientId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
  public static clientReportsReadApiV1ClientsReportsClientIdReportIdGet(
    data: ClientReportsData['payloads']['ClientReportsReadApiV1ClientsReportsClientIdReportIdGet']
  ): CancelablePromise<
    ClientReportsData['responses']['ClientReportsReadApiV1ClientsReportsClientIdReportIdGet']
  > {
    const { clientId, reportId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/clients/reports/{client_id}/{report_id}',
      path: {
        client_id: clientId,
        report_id: reportId
      },
      errors: {
        422: `Validation Error`
      }
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
  public static clientReportsUpdateApiV1ClientsReportsClientIdReportIdPatch(
    data: ClientReportsData['payloads']['ClientReportsUpdateApiV1ClientsReportsClientIdReportIdPatch']
  ): CancelablePromise<
    ClientReportsData['responses']['ClientReportsUpdateApiV1ClientsReportsClientIdReportIdPatch']
  > {
    const { clientId, reportId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/clients/reports/{client_id}/{report_id}',
      path: {
        client_id: clientId,
        report_id: reportId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static clientReportsDeleteApiV1ClientsReportsClientIdReportIdDelete(
    data: ClientReportsData['payloads']['ClientReportsDeleteApiV1ClientsReportsClientIdReportIdDelete']
  ): CancelablePromise<
    ClientReportsData['responses']['ClientReportsDeleteApiV1ClientsReportsClientIdReportIdDelete']
  > {
    const { clientId, reportId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/clients/reports/{client_id}/{report_id}',
      path: {
        client_id: clientId,
        report_id: reportId
      },
      errors: {
        422: `Validation Error`
      }
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
  public static clientReportNotesListApiV1ClientsReportsClientIdReportIdNotesGet(
    data: ClientReportsData['payloads']['ClientReportNotesListApiV1ClientsReportsClientIdReportIdNotesGet']
  ): CancelablePromise<
    ClientReportsData['responses']['ClientReportNotesListApiV1ClientsReportsClientIdReportIdNotesGet']
  > {
    const { clientId, reportId, page, size } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/clients/reports/{client_id}/{report_id}/notes',
      path: {
        client_id: clientId,
        report_id: reportId
      },
      query: {
        page,
        size
      },
      errors: {
        422: `Validation Error`
      }
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
  public static clientReportNotesCreateApiV1ClientsReportsClientIdReportIdNotesPost(
    data: ClientReportsData['payloads']['ClientReportNotesCreateApiV1ClientsReportsClientIdReportIdNotesPost']
  ): CancelablePromise<
    ClientReportsData['responses']['ClientReportNotesCreateApiV1ClientsReportsClientIdReportIdNotesPost']
  > {
    const { clientId, reportId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/clients/reports/{client_id}/{report_id}/notes',
      path: {
        client_id: clientId,
        report_id: reportId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }
}

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
  public static notesListApiV1NotesGet(
    data: NotesData['payloads']['NotesListApiV1NotesGet'] = {}
  ): CancelablePromise<NotesData['responses']['NotesListApiV1NotesGet']> {
    const { page, size, userId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/notes/',
      query: {
        page,
        size,
        user_id: userId
      },
      errors: {
        422: `Validation Error`
      }
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
  public static notesCreateApiV1NotesPost(
    data: NotesData['payloads']['NotesCreateApiV1NotesPost']
  ): CancelablePromise<NotesData['responses']['NotesCreateApiV1NotesPost']> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/notes/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
  public static notesReadApiV1NotesNoteIdGet(
    data: NotesData['payloads']['NotesReadApiV1NotesNoteIdGet']
  ): CancelablePromise<NotesData['responses']['NotesReadApiV1NotesNoteIdGet']> {
    const { noteId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/notes/{note_id}',
      path: {
        note_id: noteId
      },
      errors: {
        422: `Validation Error`
      }
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
  public static notesUpdateApiV1NotesNoteIdPatch(
    data: NotesData['payloads']['NotesUpdateApiV1NotesNoteIdPatch']
  ): CancelablePromise<NotesData['responses']['NotesUpdateApiV1NotesNoteIdPatch']> {
    const { noteId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/notes/{note_id}',
      path: {
        note_id: noteId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static notesDeleteApiV1NotesNoteIdDelete(
    data: NotesData['payloads']['NotesDeleteApiV1NotesNoteIdDelete']
  ): CancelablePromise<NotesData['responses']['NotesDeleteApiV1NotesNoteIdDelete']> {
    const { noteId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/notes/{note_id}',
      path: {
        note_id: noteId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}

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
  public static bdxFeedListApiV1BdxGet(
    data: BdxFeedsData['payloads']['BdxFeedListApiV1BdxGet'] = {}
  ): CancelablePromise<BdxFeedsData['responses']['BdxFeedListApiV1BdxGet']> {
    const { page, size, clientId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/bdx/',
      query: {
        page,
        size,
        client_id: clientId
      },
      errors: {
        422: `Validation Error`
      }
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
  public static bdxFeedCreateApiV1BdxPost(
    data: BdxFeedsData['payloads']['BdxFeedCreateApiV1BdxPost']
  ): CancelablePromise<BdxFeedsData['responses']['BdxFeedCreateApiV1BdxPost']> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/bdx/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
  public static bdxFeedReadApiV1BdxBdxIdGet(
    data: BdxFeedsData['payloads']['BdxFeedReadApiV1BdxBdxIdGet']
  ): CancelablePromise<BdxFeedsData['responses']['BdxFeedReadApiV1BdxBdxIdGet']> {
    const { bdxId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/bdx/{bdx_id}',
      path: {
        bdx_id: bdxId
      },
      errors: {
        422: `Validation Error`
      }
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
  public static bdxFeedUpdateApiV1BdxBdxIdPatch(
    data: BdxFeedsData['payloads']['BdxFeedUpdateApiV1BdxBdxIdPatch']
  ): CancelablePromise<BdxFeedsData['responses']['BdxFeedUpdateApiV1BdxBdxIdPatch']> {
    const { bdxId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/bdx/{bdx_id}',
      path: {
        bdx_id: bdxId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static bdxFeedDeleteApiV1BdxBdxIdDelete(
    data: BdxFeedsData['payloads']['BdxFeedDeleteApiV1BdxBdxIdDelete']
  ): CancelablePromise<BdxFeedsData['responses']['BdxFeedDeleteApiV1BdxBdxIdDelete']> {
    const { bdxId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/bdx/{bdx_id}',
      path: {
        bdx_id: bdxId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}

export class SharpSpringAccountsService {
  /**
   * Sharpspring:List
   * Retrieve a paginated list of sharpspring accounts.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all sharpspring accounts
   *
   * `role=user` : only sharpspring accounts that belong to the user
   *
   * Returns:
   * --------
   * `Paginated[SharpspringRead]` : a paginated list of sharpspring accounts,
   * optionally filtered
   * @returns Paginated_SharpspringRead_ Successful Response
   * @throws ApiError
   */
  public static sharpspringListApiV1SharpspringGet(
    data: SharpSpringAccountsData['payloads']['SharpspringListApiV1SharpspringGet'] = {}
  ): CancelablePromise<
    SharpSpringAccountsData['responses']['SharpspringListApiV1SharpspringGet']
  > {
    const { page, size, userId, clientId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/sharpspring/',
      query: {
        page,
        size,
        user_id: userId,
        client_id: clientId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Sharpspring:Create
   * Create a new sharpspring account.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : create new sharpspring accounts for all clients
   *
   * `role=user` : create only sharpspring accounts that belong to any clients associated
   * with the current user
   *
   * Returns:
   * --------
   * `SharpspringRead` : the newly created sharpspring account
   * @returns SharpspringRead Successful Response
   * @throws ApiError
   */
  public static sharpspringCreateApiV1SharpspringPost(
    data: SharpSpringAccountsData['payloads']['SharpspringCreateApiV1SharpspringPost']
  ): CancelablePromise<
    SharpSpringAccountsData['responses']['SharpspringCreateApiV1SharpspringPost']
  > {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/sharpspring/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Sharpspring:Read
   * Retrieve a single sharpspring account by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : read all sharpspring accounts
   *
   * `role=user` : read only sharpspring accounts that belong to any clients
   * associated with the current user
   *
   * Returns:
   * --------
   * `SharpspringRead` : the sharpspring account matching the ss_id
   * @returns SharpspringRead Successful Response
   * @throws ApiError
   */
  public static sharpspringReadApiV1SharpspringSsIdGet(
    data: SharpSpringAccountsData['payloads']['SharpspringReadApiV1SharpspringSsIdGet']
  ): CancelablePromise<
    SharpSpringAccountsData['responses']['SharpspringReadApiV1SharpspringSsIdGet']
  > {
    const { ssId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/sharpspring/{ss_id}',
      path: {
        ss_id: ssId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Sharpspring:Update
   * Update a sharpspring account by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : update all sharpspring accounts
   *
   * `role=user` : update only sharpspring accounts that belong to any clients associated
   * with the current user
   *
   * Returns:
   * --------
   * `SharpspringRead` : the updated sharpspring account
   * @returns SharpspringRead Successful Response
   * @throws ApiError
   */
  public static sharpspringUpdateApiV1SharpspringSsIdPatch(
    data: SharpSpringAccountsData['payloads']['SharpspringUpdateApiV1SharpspringSsIdPatch']
  ): CancelablePromise<
    SharpSpringAccountsData['responses']['SharpspringUpdateApiV1SharpspringSsIdPatch']
  > {
    const { ssId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/sharpspring/{ss_id}',
      path: {
        ss_id: ssId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Sharpspring:Delete
   * Delete a sharpspring account by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : delete any sharpspring accounts
   *
   * `role=user` : delete only sharpspring accounts that belong to any clients associated
   * with the current user
   *
   * Returns:
   * --------
   * `None`
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static sharpspringDeleteApiV1SharpspringSsIdDelete(
    data: SharpSpringAccountsData['payloads']['SharpspringDeleteApiV1SharpspringSsIdDelete']
  ): CancelablePromise<
    SharpSpringAccountsData['responses']['SharpspringDeleteApiV1SharpspringSsIdDelete']
  > {
    const { ssId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/sharpspring/{ss_id}',
      path: {
        ss_id: ssId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}

export class GoogleCloudAccountsService {
  /**
   * Go Cloud Property:List
   * Retrieve a paginated list of go_cloud property.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all go_cloud properties
   *
   * `role=user` : only go_cloud properties that belong to the user
   *
   * Returns:
   * --------
   * `Paginated[GoCloudPropertyRead]` : a paginated list of go_cloud properties,
   * optionally filtered
   * @returns Paginated_GoCloudPropertyRead_ Successful Response
   * @throws ApiError
   */
  public static goCloudPropertyListApiV1GoCloudGet(
    data: GoogleCloudAccountsData['payloads']['GoCloudPropertyListApiV1GoCloudGet'] = {}
  ): CancelablePromise<
    GoogleCloudAccountsData['responses']['GoCloudPropertyListApiV1GoCloudGet']
  > {
    const { page, size, clientId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/go/cloud/',
      query: {
        page,
        size,
        client_id: clientId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Go Cloud Property:Create
   * Create a new go_cloud property.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : create new go_cloud properties for all clients
   *
   * `role=user` : create only go_cloud properties that belong to any clients associated
   * with the current user
   *
   * Returns:
   * --------
   * `GoCloudPropertyRead` : the newly created go_cloud
   * @returns GoCloudPropertyRead Successful Response
   * @throws ApiError
   */
  public static goCloudPropertyCreateApiV1GoCloudPost(
    data: GoogleCloudAccountsData['payloads']['GoCloudPropertyCreateApiV1GoCloudPost']
  ): CancelablePromise<
    GoogleCloudAccountsData['responses']['GoCloudPropertyCreateApiV1GoCloudPost']
  > {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/go/cloud/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Go Cloud Property:Read
   * Retrieve a single go_cloud property by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : read all go_cloud properties
   *
   * `role=user` : read only go_cloud properties that belong to any clients
   * associated with the current user
   *
   * Returns:
   * --------
   * `GoCloudPropertyRead` : the go_cloud matching the go_cloud_id
   * @returns GoCloudPropertyRead Successful Response
   * @throws ApiError
   */
  public static goCloudPropertyReadApiV1GoCloudGoCloudIdGet(
    data: GoogleCloudAccountsData['payloads']['GoCloudPropertyReadApiV1GoCloudGoCloudIdGet']
  ): CancelablePromise<
    GoogleCloudAccountsData['responses']['GoCloudPropertyReadApiV1GoCloudGoCloudIdGet']
  > {
    const { goCloudId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/go/cloud/{go_cloud_id}',
      path: {
        go_cloud_id: goCloudId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Go Cloud Property:Update
   * Update a go_cloud by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : update all go_cloud properties
   *
   * `role=user` : update only go_cloud properties that belong to any clients associated
   * with the current user
   *
   * Returns:
   * --------
   * `GoCloudPropertyRead` : the updated go_cloud property
   * @returns GoCloudPropertyRead Successful Response
   * @throws ApiError
   */
  public static goCloudPropertyUpdateApiV1GoCloudGoCloudIdPatch(
    data: GoogleCloudAccountsData['payloads']['GoCloudPropertyUpdateApiV1GoCloudGoCloudIdPatch']
  ): CancelablePromise<
    GoogleCloudAccountsData['responses']['GoCloudPropertyUpdateApiV1GoCloudGoCloudIdPatch']
  > {
    const { goCloudId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/go/cloud/{go_cloud_id}',
      path: {
        go_cloud_id: goCloudId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Go Cloud Property:Delete
   * Delete a go_cloud property by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : delete any go_cloud properties
   *
   * `role=user` : delete only go_cloud properties that belong to any clients associated
   * with the current user
   *
   * Returns:
   * --------
   * `None`
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static goCloudPropertyDeleteApiV1GoCloudGoCloudIdDelete(
    data: GoogleCloudAccountsData['payloads']['GoCloudPropertyDeleteApiV1GoCloudGoCloudIdDelete']
  ): CancelablePromise<
    GoogleCloudAccountsData['responses']['GoCloudPropertyDeleteApiV1GoCloudGoCloudIdDelete']
  > {
    const { goCloudId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/go/cloud/{go_cloud_id}',
      path: {
        go_cloud_id: goCloudId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}

export class GoogleAnalytics4PropertiesService {
  /**
   * Ga4 Property:List
   * Retrieve a paginated list of ga4 properties.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all ga4 properties
   *
   * `role=user` : only ga4 properties that belong to the user
   *
   * Returns:
   * --------
   * `Paginated[GoAnalytics4PropertyRead]` : a paginated list of ga4 properties,
   * optionally filtered
   * @returns Paginated_GoAnalytics4PropertyRead_ Successful Response
   * @throws ApiError
   */
  public static ga4PropertyListApiV1Ga4PropertyGet(
    data: GoogleAnalytics4PropertiesData['payloads']['Ga4PropertyListApiV1Ga4PropertyGet'] = {}
  ): CancelablePromise<
    GoogleAnalytics4PropertiesData['responses']['Ga4PropertyListApiV1Ga4PropertyGet']
  > {
    const { page, size, clientId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/ga4/property/',
      query: {
        page,
        size,
        client_id: clientId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Ga4 Property:Create
   * Create a new ga4 properties.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : create new ga4 properties for all clients
   *
   * `role=user` : create only ga4 properties that belong to any clients associated
   * with the current user
   *
   * Returns:
   * --------
   * `GoAnalytics4PropertyRead` : the newly created ga4 property
   * @returns GoAnalytics4PropertyRead Successful Response
   * @throws ApiError
   */
  public static ga4PropertyCreateApiV1Ga4PropertyPost(
    data: GoogleAnalytics4PropertiesData['payloads']['Ga4PropertyCreateApiV1Ga4PropertyPost']
  ): CancelablePromise<
    GoogleAnalytics4PropertiesData['responses']['Ga4PropertyCreateApiV1Ga4PropertyPost']
  > {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/ga4/property/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Ga4 Property:Read
   * Retrieve a single ga4 property by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : read all ga4 properties
   *
   * `role=user` : read only ga4 properties that belong to any clients
   * associated with the current user
   *
   * Returns:
   * --------
   * `GoAnalytics4PropertyRead` : the ga4 property matching the ga4_id
   * @returns GoAnalytics4PropertyRead Successful Response
   * @throws ApiError
   */
  public static ga4PropertyReadApiV1Ga4PropertyGa4IdGet(
    data: GoogleAnalytics4PropertiesData['payloads']['Ga4PropertyReadApiV1Ga4PropertyGa4IdGet']
  ): CancelablePromise<
    GoogleAnalytics4PropertiesData['responses']['Ga4PropertyReadApiV1Ga4PropertyGa4IdGet']
  > {
    const { ga4Id } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/ga4/property/{ga4_id}',
      path: {
        ga4_id: ga4Id
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Ga4 Property:Update
   * Update a ga4 property by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : update all ga4 properties
   *
   * `role=user` : update only ga4 properties that belong to any clients associated
   * with the current user
   *
   * Returns:
   * --------
   * `GoAnalytics4PropertyRead` : the updated ga4 property
   * @returns GoAnalytics4PropertyRead Successful Response
   * @throws ApiError
   */
  public static ga4PropertyUpdateApiV1Ga4PropertyGa4IdPatch(
    data: GoogleAnalytics4PropertiesData['payloads']['Ga4PropertyUpdateApiV1Ga4PropertyGa4IdPatch']
  ): CancelablePromise<
    GoogleAnalytics4PropertiesData['responses']['Ga4PropertyUpdateApiV1Ga4PropertyGa4IdPatch']
  > {
    const { ga4Id, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/ga4/property/{ga4_id}',
      path: {
        ga4_id: ga4Id
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Ga4 Property:Delete
   * Delete a ga4 property by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : delete any ga4 properties
   *
   * `role=user` : delete only ga4 properties that belong to any clients associated
   * with the current user
   *
   * Returns:
   * --------
   * `None`
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static ga4PropertyDeleteApiV1Ga4PropertyGa4IdDelete(
    data: GoogleAnalytics4PropertiesData['payloads']['Ga4PropertyDeleteApiV1Ga4PropertyGa4IdDelete']
  ): CancelablePromise<
    GoogleAnalytics4PropertiesData['responses']['Ga4PropertyDeleteApiV1Ga4PropertyGa4IdDelete']
  > {
    const { ga4Id } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/ga4/property/{ga4_id}',
      path: {
        ga4_id: ga4Id
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}

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
  public static ga4StreamListApiV1Ga4StreamGet(
    data: GoogleAnalytics4PropertyStreamsData['payloads']['Ga4StreamListApiV1Ga4StreamGet'] = {}
  ): CancelablePromise<
    GoogleAnalytics4PropertyStreamsData['responses']['Ga4StreamListApiV1Ga4StreamGet']
  > {
    const { page, size, websiteId, ga4Id } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/ga4/stream/',
      query: {
        page,
        size,
        website_id: websiteId,
        ga4_id: ga4Id
      },
      errors: {
        422: `Validation Error`
      }
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
  public static ga4StreamCreateApiV1Ga4StreamPost(
    data: GoogleAnalytics4PropertyStreamsData['payloads']['Ga4StreamCreateApiV1Ga4StreamPost']
  ): CancelablePromise<
    GoogleAnalytics4PropertyStreamsData['responses']['Ga4StreamCreateApiV1Ga4StreamPost']
  > {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/ga4/stream/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
  public static ga4StreamReadApiV1Ga4StreamGa4StreamIdGet(
    data: GoogleAnalytics4PropertyStreamsData['payloads']['Ga4StreamReadApiV1Ga4StreamGa4StreamIdGet']
  ): CancelablePromise<
    GoogleAnalytics4PropertyStreamsData['responses']['Ga4StreamReadApiV1Ga4StreamGa4StreamIdGet']
  > {
    const { ga4StreamId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/ga4/stream/{ga4_stream_id}',
      path: {
        ga4_stream_id: ga4StreamId
      },
      errors: {
        422: `Validation Error`
      }
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
  public static ga4StreamUpdateApiV1Ga4StreamGa4StreamIdPatch(
    data: GoogleAnalytics4PropertyStreamsData['payloads']['Ga4StreamUpdateApiV1Ga4StreamGa4StreamIdPatch']
  ): CancelablePromise<
    GoogleAnalytics4PropertyStreamsData['responses']['Ga4StreamUpdateApiV1Ga4StreamGa4StreamIdPatch']
  > {
    const { ga4StreamId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/ga4/stream/{ga4_stream_id}',
      path: {
        ga4_stream_id: ga4StreamId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static ga4StreamDeleteApiV1Ga4StreamGa4StreamIdDelete(
    data: GoogleAnalytics4PropertyStreamsData['payloads']['Ga4StreamDeleteApiV1Ga4StreamGa4StreamIdDelete']
  ): CancelablePromise<
    GoogleAnalytics4PropertyStreamsData['responses']['Ga4StreamDeleteApiV1Ga4StreamGa4StreamIdDelete']
  > {
    const { ga4StreamId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/ga4/stream/{ga4_stream_id}',
      path: {
        ga4_stream_id: ga4StreamId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}

export class GoogleSearchConsolePropertiesService {
  /**
   * Go Search Console Property:List
   * Retrieve a paginated list of google search console properties.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all google search console properties
   *
   * `role=user` : only google search console properties that belong to the user
   *
   * Returns:
   * --------
   * `Paginated[GoSearchConsolePropertyRead]` : a paginated list of google search
   * console properties, optionally filtered
   * @returns Paginated_GoSearchConsolePropertyRead_ Successful Response
   * @throws ApiError
   */
  public static goSearchConsolePropertyListApiV1GoSearchPropertyGet(
    data: GoogleSearchConsolePropertiesData['payloads']['GoSearchConsolePropertyListApiV1GoSearchPropertyGet'] = {}
  ): CancelablePromise<
    GoogleSearchConsolePropertiesData['responses']['GoSearchConsolePropertyListApiV1GoSearchPropertyGet']
  > {
    const { page, size, clientId, websiteId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/go/search/property/',
      query: {
        page,
        size,
        client_id: clientId,
        website_id: websiteId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Go Search Console Property:Create
   * Create a new google search console properties.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : create new google search console properties
   * for all clients
   *
   * `role=user` : create only google search console properties that belong
   * to any clients associated with the current user
   *
   * Returns:
   * --------
   * `GoSearchConsolePropertyRead` : the newly created google search console
   * property
   * @returns GoSearchConsolePropertyRead Successful Response
   * @throws ApiError
   */
  public static goSearchConsolePropertyCreateApiV1GoSearchPropertyPost(
    data: GoogleSearchConsolePropertiesData['payloads']['GoSearchConsolePropertyCreateApiV1GoSearchPropertyPost']
  ): CancelablePromise<
    GoogleSearchConsolePropertiesData['responses']['GoSearchConsolePropertyCreateApiV1GoSearchPropertyPost']
  > {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/go/search/property/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Go Search Console Property:Read
   * Retrieve a single google search console property by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : read all google search console properties
   *
   * `role=user` : read only google search console properties that belong to
   * any clients associated with the current user
   *
   * Returns:
   * --------
   * `GoSearchConsolePropertyRead` : the google search console property matching
   * the gsc_id
   * @returns GoSearchConsolePropertyRead Successful Response
   * @throws ApiError
   */
  public static goSearchConsolePropertyReadApiV1GoSearchPropertyGscIdGet(
    data: GoogleSearchConsolePropertiesData['payloads']['GoSearchConsolePropertyReadApiV1GoSearchPropertyGscIdGet']
  ): CancelablePromise<
    GoogleSearchConsolePropertiesData['responses']['GoSearchConsolePropertyReadApiV1GoSearchPropertyGscIdGet']
  > {
    const { gscId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/go/search/property/{gsc_id}',
      path: {
        gsc_id: gscId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Go Search Console Property:Update
   * Update a google search console property by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : update all google search console properties
   *
   * `role=user` : update only google search console properties that belong to
   * any clients associated with the current user
   *
   * Returns:
   * --------
   * `GoSearchConsolePropertyRead` : the updated google search console property
   * @returns GoSearchConsolePropertyRead Successful Response
   * @throws ApiError
   */
  public static goSearchConsolePropertyUpdateApiV1GoSearchPropertyGscIdPatch(
    data: GoogleSearchConsolePropertiesData['payloads']['GoSearchConsolePropertyUpdateApiV1GoSearchPropertyGscIdPatch']
  ): CancelablePromise<
    GoogleSearchConsolePropertiesData['responses']['GoSearchConsolePropertyUpdateApiV1GoSearchPropertyGscIdPatch']
  > {
    const { gscId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/go/search/property/{gsc_id}',
      path: {
        gsc_id: gscId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Go Search Console Property:Delete
   * Delete a google search console property by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : delete any google search console properties
   *
   * `role=user` : delete only google search console properties that belong to
   * any clients associated with the current user
   *
   * Returns:
   * --------
   * `None`
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static goSearchConsolePropertyDeleteApiV1GoSearchPropertyGscIdDelete(
    data: GoogleSearchConsolePropertiesData['payloads']['GoSearchConsolePropertyDeleteApiV1GoSearchPropertyGscIdDelete']
  ): CancelablePromise<
    GoogleSearchConsolePropertiesData['responses']['GoSearchConsolePropertyDeleteApiV1GoSearchPropertyGscIdDelete']
  > {
    const { gscId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/go/search/property/{gsc_id}',
      path: {
        gsc_id: gscId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}

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
  public static goSearchConsolePropertyMetricListAllMetricTypesApiV1GoSearchMetricGscIdGet(
    data: GoogleSearchConsolePropertyMetricsData['payloads']['GoSearchConsolePropertyMetricListAllMetricTypesApiV1GoSearchMetricGscIdGet']
  ): CancelablePromise<
    GoogleSearchConsolePropertyMetricsData['responses']['GoSearchConsolePropertyMetricListAllMetricTypesApiV1GoSearchMetricGscIdGet']
  > {
    const { gscId, page, size, metricTypes, dateStart, dateEnd } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/go/search/metric/{gsc_id}',
      path: {
        gsc_id: gscId
      },
      query: {
        page,
        size,
        metric_types: metricTypes,
        date_start: dateStart,
        date_end: dateEnd
      },
      errors: {
        422: `Validation Error`
      }
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
  public static goSearchConsolePropertyMetricListByMetricTypeApiV1GoSearchMetricGscIdMetricTypeGet(
    data: GoogleSearchConsolePropertyMetricsData['payloads']['GoSearchConsolePropertyMetricListByMetricTypeApiV1GoSearchMetricGscIdMetricTypeGet']
  ): CancelablePromise<
    GoogleSearchConsolePropertyMetricsData['responses']['GoSearchConsolePropertyMetricListByMetricTypeApiV1GoSearchMetricGscIdMetricTypeGet']
  > {
    const { metricType, gscId, page, size, metricTypes, dateStart, dateEnd } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/go/search/metric/{gsc_id}/{metric_type}',
      path: {
        metric_type: metricType,
        gsc_id: gscId
      },
      query: {
        page,
        size,
        metric_types: metricTypes,
        date_start: dateStart,
        date_end: dateEnd
      },
      errors: {
        422: `Validation Error`
      }
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
  public static goSearchConsolePropertyMetricCreateApiV1GoSearchMetricGscIdMetricTypePost(
    data: GoogleSearchConsolePropertyMetricsData['payloads']['GoSearchConsolePropertyMetricCreateApiV1GoSearchMetricGscIdMetricTypePost']
  ): CancelablePromise<
    GoogleSearchConsolePropertyMetricsData['responses']['GoSearchConsolePropertyMetricCreateApiV1GoSearchMetricGscIdMetricTypePost']
  > {
    const { metricType, gscId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/go/search/metric/{gsc_id}/{metric_type}',
      path: {
        metric_type: metricType,
        gsc_id: gscId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
  public static goSearchConsolePropertyMetricReadApiV1GoSearchMetricGscIdMetricTypeMetricIdGet(
    data: GoogleSearchConsolePropertyMetricsData['payloads']['GoSearchConsolePropertyMetricReadApiV1GoSearchMetricGscIdMetricTypeMetricIdGet']
  ): CancelablePromise<
    GoogleSearchConsolePropertyMetricsData['responses']['GoSearchConsolePropertyMetricReadApiV1GoSearchMetricGscIdMetricTypeMetricIdGet']
  > {
    const { gscId, metricType, metricId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/go/search/metric/{gsc_id}/{metric_type}/{metric_id}',
      path: {
        gsc_id: gscId,
        metric_type: metricType,
        metric_id: metricId
      },
      errors: {
        422: `Validation Error`
      }
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
  public static goSearchConsolePropertyMetricUpdateApiV1GoSearchMetricGscIdMetricTypeMetricIdPatch(
    data: GoogleSearchConsolePropertyMetricsData['payloads']['GoSearchConsolePropertyMetricUpdateApiV1GoSearchMetricGscIdMetricTypeMetricIdPatch']
  ): CancelablePromise<
    GoogleSearchConsolePropertyMetricsData['responses']['GoSearchConsolePropertyMetricUpdateApiV1GoSearchMetricGscIdMetricTypeMetricIdPatch']
  > {
    const { metricType, gscId, metricId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/go/search/metric/{gsc_id}/{metric_type}/{metric_id}',
      path: {
        metric_type: metricType,
        gsc_id: gscId,
        metric_id: metricId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static goSearchConsolePropertyMetricDeleteApiV1GoSearchMetricGscIdMetricTypeMetricIdDelete(
    data: GoogleSearchConsolePropertyMetricsData['payloads']['GoSearchConsolePropertyMetricDeleteApiV1GoSearchMetricGscIdMetricTypeMetricIdDelete']
  ): CancelablePromise<
    GoogleSearchConsolePropertyMetricsData['responses']['GoSearchConsolePropertyMetricDeleteApiV1GoSearchMetricGscIdMetricTypeMetricIdDelete']
  > {
    const { metricType, gscId, metricId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/go/search/metric/{gsc_id}/{metric_type}/{metric_id}',
      path: {
        metric_type: metricType,
        gsc_id: gscId,
        metric_id: metricId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}

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
  public static websitesListApiV1WebsitesGet(
    data: WebsitesData['payloads']['WebsitesListApiV1WebsitesGet'] = {}
  ): CancelablePromise<WebsitesData['responses']['WebsitesListApiV1WebsitesGet']> {
    const { page, size, clientId, websiteId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/websites/',
      query: {
        page,
        size,
        client_id: clientId,
        website_id: websiteId
      },
      errors: {
        422: `Validation Error`
      }
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
  public static websitesCreateApiV1WebsitesPost(
    data: WebsitesData['payloads']['WebsitesCreateApiV1WebsitesPost']
  ): CancelablePromise<WebsitesData['responses']['WebsitesCreateApiV1WebsitesPost']> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/websites/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
  public static websitesReadApiV1WebsitesWebsiteIdGet(
    data: WebsitesData['payloads']['WebsitesReadApiV1WebsitesWebsiteIdGet']
  ): CancelablePromise<
    WebsitesData['responses']['WebsitesReadApiV1WebsitesWebsiteIdGet']
  > {
    const { websiteId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/websites/{website_id}',
      path: {
        website_id: websiteId
      },
      errors: {
        422: `Validation Error`
      }
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
  public static websitesUpdateApiV1WebsitesWebsiteIdPatch(
    data: WebsitesData['payloads']['WebsitesUpdateApiV1WebsitesWebsiteIdPatch']
  ): CancelablePromise<
    WebsitesData['responses']['WebsitesUpdateApiV1WebsitesWebsiteIdPatch']
  > {
    const { websiteId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/websites/{website_id}',
      path: {
        website_id: websiteId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static websitesDeleteApiV1WebsitesWebsiteIdDelete(
    data: WebsitesData['payloads']['WebsitesDeleteApiV1WebsitesWebsiteIdDelete']
  ): CancelablePromise<
    WebsitesData['responses']['WebsitesDeleteApiV1WebsitesWebsiteIdDelete']
  > {
    const { websiteId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/websites/{website_id}',
      path: {
        website_id: websiteId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}

export class WebsitePagesService {
  /**
   * Website Pages:List
   * Retrieve a paginated list of website pages.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all website pages
   *
   * `role=client` : only website pages with a website_id associated with the client
   * via `client_website` table
   *
   * `role=employee` : only website pages with a website_id associated with a client's
   * website via `client_website` table, associated with the user via `user_client`
   *
   * Returns:
   * --------
   * `Paginated[WebsitePageRead]` : a paginated list of website pages,
   * optionally filtered
   * @returns Paginated_WebsitePageRead_ Successful Response
   * @throws ApiError
   */
  public static websitePagesListApiV1WebpagesGet(
    data: WebsitePagesData['payloads']['WebsitePagesListApiV1WebpagesGet'] = {}
  ): CancelablePromise<
    WebsitePagesData['responses']['WebsitePagesListApiV1WebpagesGet']
  > {
    const { page, size, websiteId, sitemapId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/webpages/',
      query: {
        page,
        size,
        website_id: websiteId,
        sitemap_id: sitemapId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Website Pages:Create
   * Create a new website page.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : create a new website page
   *
   * `role=user` : create a new website page that belongs to a website associated
   * with the client via `client_website` table, associated with the user via the
   * `user_client` table
   *
   * Returns:
   * --------
   * `WebsitePageRead` : the newly created website page
   * @returns WebsitePageRead Successful Response
   * @throws ApiError
   */
  public static websitePagesCreateApiV1WebpagesPost(
    data: WebsitePagesData['payloads']['WebsitePagesCreateApiV1WebpagesPost']
  ): CancelablePromise<
    WebsitePagesData['responses']['WebsitePagesCreateApiV1WebpagesPost']
  > {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/webpages/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Website Pages:Read
   * Retrieve a single website page by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all website pages
   *
   * `role=user` : only website pages with a website_id associated with a client's
   * website via `client_website` table, associated with the user via `user_client`
   *
   * Returns:
   * --------
   * `WebsitePageRead` : the website page requested by page_id
   * @returns WebsitePageRead Successful Response
   * @throws ApiError
   */
  public static websitePagesReadApiV1WebpagesPageIdGet(
    data: WebsitePagesData['payloads']['WebsitePagesReadApiV1WebpagesPageIdGet']
  ): CancelablePromise<
    WebsitePagesData['responses']['WebsitePagesReadApiV1WebpagesPageIdGet']
  > {
    const { pageId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/webpages/{page_id}',
      path: {
        page_id: pageId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Website Pages:Update
   * Update a website page by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all website pages
   *
   * `role=user` : only website pages with a website_id associated with a client's
   * website via `client_website` table, associated with the user via `user_client`
   *
   * Returns:
   * --------
   * `WebsitePageRead` : the updated website page
   * @returns WebsitePageRead Successful Response
   * @throws ApiError
   */
  public static websitePagesUpdateApiV1WebpagesPageIdPatch(
    data: WebsitePagesData['payloads']['WebsitePagesUpdateApiV1WebpagesPageIdPatch']
  ): CancelablePromise<
    WebsitePagesData['responses']['WebsitePagesUpdateApiV1WebpagesPageIdPatch']
  > {
    const { pageId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/webpages/{page_id}',
      path: {
        page_id: pageId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Website Pages:Delete
   * Delete a website page by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all website pages
   *
   * `role=user` : only website pages with a website_id associated with a client's
   * website via `client_website` table, associated with the user via `user_client`
   *
   * Returns:
   * --------
   * `None`
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static websitePagesDeleteApiV1WebpagesPageIdDelete(
    data: WebsitePagesData['payloads']['WebsitePagesDeleteApiV1WebpagesPageIdDelete']
  ): CancelablePromise<
    WebsitePagesData['responses']['WebsitePagesDeleteApiV1WebpagesPageIdDelete']
  > {
    const { pageId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/webpages/{page_id}',
      path: {
        page_id: pageId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Website Pages:Process Website Page Speed Insights
   * A webhook to initiate processing a website page's page speed insights.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all website pages
   *
   * `role=user` : only website pages with a website_id associated with a client's
   * website via `client_website` table, associated with the user via `user_client`
   *
   * Returns:
   * --------
   * `WebsitePagePSIProcessing` : a website page PSI processing object containing the
   * task_id's for the mobile and desktop page speed insights tasks
   * @returns WebsitePagePSIProcessing Successful Response
   * @throws ApiError
   */
  public static websitePagesProcessWebsitePageSpeedInsightsApiV1WebpagesPageIdProcessPsiPost(
    data: WebsitePagesData['payloads']['WebsitePagesProcessWebsitePageSpeedInsightsApiV1WebpagesPageIdProcessPsiPost']
  ): CancelablePromise<
    WebsitePagesData['responses']['WebsitePagesProcessWebsitePageSpeedInsightsApiV1WebpagesPageIdProcessPsiPost']
  > {
    const { pageId } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/webpages/{page_id}/process-psi',
      path: {
        page_id: pageId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}

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
  public static websiteSitemapsListApiV1SitemapsGet(
    data: WebsiteSitemapsData['payloads']['WebsiteSitemapsListApiV1SitemapsGet'] = {}
  ): CancelablePromise<
    WebsiteSitemapsData['responses']['WebsiteSitemapsListApiV1SitemapsGet']
  > {
    const { page, size, websiteId, sitemapId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/sitemaps/',
      query: {
        page,
        size,
        website_id: websiteId,
        sitemap_id: sitemapId
      },
      errors: {
        422: `Validation Error`
      }
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
  public static websiteSitemapsCreateApiV1SitemapsPost(
    data: WebsiteSitemapsData['payloads']['WebsiteSitemapsCreateApiV1SitemapsPost']
  ): CancelablePromise<
    WebsiteSitemapsData['responses']['WebsiteSitemapsCreateApiV1SitemapsPost']
  > {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/sitemaps/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
  public static websiteSitemapsReadApiV1SitemapsSitemapIdGet(
    data: WebsiteSitemapsData['payloads']['WebsiteSitemapsReadApiV1SitemapsSitemapIdGet']
  ): CancelablePromise<
    WebsiteSitemapsData['responses']['WebsiteSitemapsReadApiV1SitemapsSitemapIdGet']
  > {
    const { sitemapId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/sitemaps/{sitemap_id}',
      path: {
        sitemap_id: sitemapId
      },
      errors: {
        422: `Validation Error`
      }
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
  public static websiteSitemapsUpdateApiV1SitemapsSitemapIdPatch(
    data: WebsiteSitemapsData['payloads']['WebsiteSitemapsUpdateApiV1SitemapsSitemapIdPatch']
  ): CancelablePromise<
    WebsiteSitemapsData['responses']['WebsiteSitemapsUpdateApiV1SitemapsSitemapIdPatch']
  > {
    const { sitemapId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/sitemaps/{sitemap_id}',
      path: {
        sitemap_id: sitemapId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static websiteSitemapsDeleteApiV1SitemapsSitemapIdDelete(
    data: WebsiteSitemapsData['payloads']['WebsiteSitemapsDeleteApiV1SitemapsSitemapIdDelete']
  ): CancelablePromise<
    WebsiteSitemapsData['responses']['WebsiteSitemapsDeleteApiV1SitemapsSitemapIdDelete']
  > {
    const { sitemapId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/sitemaps/{sitemap_id}',
      path: {
        sitemap_id: sitemapId
      },
      errors: {
        422: `Validation Error`
      }
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
  public static websiteSitemapsProcessSitemapPagesApiV1SitemapsSitemapIdProcessPagesGet(
    data: WebsiteSitemapsData['payloads']['WebsiteSitemapsProcessSitemapPagesApiV1SitemapsSitemapIdProcessPagesGet']
  ): CancelablePromise<
    WebsiteSitemapsData['responses']['WebsiteSitemapsProcessSitemapPagesApiV1SitemapsSitemapIdProcessPagesGet']
  > {
    const { sitemapId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/sitemaps/{sitemap_id}/process-pages',
      path: {
        sitemap_id: sitemapId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}

export class WebsitePageSpeedInsightsService {
  /**
   * Website Page Speed Insights:List
   * Retrieve a paginated list of website page speed insights.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : all website page speed insights
   *
   * `role=client` : only website page speed insights with a website_id associated with
   * the client via `client_website` table
   *
   * `role=employee` : only website page speed insights with a website_id associated
   * with a client's website via `client_website` table, associated with the user
   * via `user_client`
   *
   * Returns:
   * --------
   * `Paginated[WebsitePageSpeedInsightsRead]` : a paginated list of website page speed
   * insights, optionally filtered
   * @returns Paginated_WebsitePageSpeedInsightsRead_ Successful Response
   * @throws ApiError
   */
  public static websitePageSpeedInsightsListApiV1PsiGet(
    data: WebsitePageSpeedInsightsData['payloads']['WebsitePageSpeedInsightsListApiV1PsiGet'] = {}
  ): CancelablePromise<
    WebsitePageSpeedInsightsData['responses']['WebsitePageSpeedInsightsListApiV1PsiGet']
  > {
    const { page, size, websiteId, pageId, strategy } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/psi/',
      query: {
        page,
        size,
        website_id: websiteId,
        page_id: pageId,
        strategy
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Website Page Speed Insights:Create
   * Create a new website page speed insights.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : create a new website page speed insights
   *
   * `role=client` : create a new website page speed insights that belongs to a website
   * associated with the client via `client_website` table
   *
   * `role=employee` : create a new website page speed insights that belongs to a website
   * associated with a client via `client_website` table, associated with the user
   * via the `user_client` table
   *
   * Returns:
   * --------
   * `WebsitePageSpeedInsightsRead` : the newly created website page speed insights
   * @returns WebsitePageSpeedInsightsRead Successful Response
   * @throws ApiError
   */
  public static websitePageSpeedInsightsCreateApiV1PsiPost(
    data: WebsitePageSpeedInsightsData['payloads']['WebsitePageSpeedInsightsCreateApiV1PsiPost']
  ): CancelablePromise<
    WebsitePageSpeedInsightsData['responses']['WebsitePageSpeedInsightsCreateApiV1PsiPost']
  > {
    const { requestBody, page, size, websiteId, pageId, strategy } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/psi/',
      query: {
        page,
        size,
        website_id: websiteId,
        page_id: pageId,
        strategy
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Website Page Speed Insights:Read
   * Retrieve a single website page speed insights by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : read any website page speed insight
   *
   * `role=client` : read any website page speed insight that belongs to a website
   * associated with the client via `client_website` table
   *
   * `role=employee` : read any website page speed insight that belongs to a website
   * associated with a client via `client_website` table, associated with the user
   * via the `user_client` table
   *
   * Returns:
   * --------
   * `WebsitePageSpeedInsightsRead` : the website page speed insights requested by psi_id
   * @returns WebsitePageSpeedInsightsRead Successful Response
   * @throws ApiError
   */
  public static websitePageSpeedInsightsReadApiV1PsiPsiIdGet(
    data: WebsitePageSpeedInsightsData['payloads']['WebsitePageSpeedInsightsReadApiV1PsiPsiIdGet']
  ): CancelablePromise<
    WebsitePageSpeedInsightsData['responses']['WebsitePageSpeedInsightsReadApiV1PsiPsiIdGet']
  > {
    const { psiId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/psi/{psi_id}',
      path: {
        psi_id: psiId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Website Page Speed Insights:Delete
   * Delete a single website page speed insights by id.
   *
   * Permissions:
   * ------------
   * `role=admin|manager` : delete any website page speed insight
   *
   * `role=client` : delete any website page speed insight that belongs to a website
   * associated with the client via `client_website` table
   *
   * `role=employee` : delete any website page speed insight that belongs to a website
   * associated with a client via `client_website` table, associated with the user
   * via the `user_client` table
   *
   * Returns:
   * --------
   * `None`
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static websitePageSpeedInsightsDeleteApiV1PsiPsiIdDelete(
    data: WebsitePageSpeedInsightsData['payloads']['WebsitePageSpeedInsightsDeleteApiV1PsiPsiIdDelete']
  ): CancelablePromise<
    WebsitePageSpeedInsightsData['responses']['WebsitePageSpeedInsightsDeleteApiV1PsiPsiIdDelete']
  > {
    const { psiId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/psi/{psi_id}',
      path: {
        psi_id: psiId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}

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
  public static websitePageKeywordCorpusListApiV1KwcGet(
    data: WebsitePageKeywordCorpusData['payloads']['WebsitePageKeywordCorpusListApiV1KwcGet'] = {}
  ): CancelablePromise<
    WebsitePageKeywordCorpusData['responses']['WebsitePageKeywordCorpusListApiV1KwcGet']
  > {
    const { page, size, websiteId, pageId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/kwc/',
      query: {
        page,
        size,
        website_id: websiteId,
        page_id: pageId
      },
      errors: {
        422: `Validation Error`
      }
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
  public static websitePageKeywordCorpusCreateApiV1KwcPost(
    data: WebsitePageKeywordCorpusData['payloads']['WebsitePageKeywordCorpusCreateApiV1KwcPost']
  ): CancelablePromise<
    WebsitePageKeywordCorpusData['responses']['WebsitePageKeywordCorpusCreateApiV1KwcPost']
  > {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/kwc/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
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
  public static websitePageKeywordCorpusReadApiV1KwcKwcIdGet(
    data: WebsitePageKeywordCorpusData['payloads']['WebsitePageKeywordCorpusReadApiV1KwcKwcIdGet']
  ): CancelablePromise<
    WebsitePageKeywordCorpusData['responses']['WebsitePageKeywordCorpusReadApiV1KwcKwcIdGet']
  > {
    const { kwcId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/kwc/{kwc_id}',
      path: {
        kwc_id: kwcId
      },
      errors: {
        422: `Validation Error`
      }
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
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static websitePageKeywordCorpusDeleteApiV1KwcKwcIdDelete(
    data: WebsitePageKeywordCorpusData['payloads']['WebsitePageKeywordCorpusDeleteApiV1KwcKwcIdDelete']
  ): CancelablePromise<
    WebsitePageKeywordCorpusData['responses']['WebsitePageKeywordCorpusDeleteApiV1KwcKwcIdDelete']
  > {
    const { kwcId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/kwc/{kwc_id}',
      path: {
        kwc_id: kwcId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}
