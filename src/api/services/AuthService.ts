/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BearerResponse } from '../models/BearerResponse';
import type { Body_auth_access_api_v1_auth_access_post } from '../models/Body_auth_access_api_v1_auth_access_post';
import type { Body_auth_forgot_password_api_v1_auth_forgot_password_post } from '../models/Body_auth_forgot_password_api_v1_auth_forgot_password_post';
import type { Body_auth_reset_password_api_v1_auth_reset_password_post } from '../models/Body_auth_reset_password_api_v1_auth_reset_password_post';
import type { Body_auth_verification_api_v1_auth_verification_post } from '../models/Body_auth_verification_api_v1_auth_verification_post';
import type { UserCreate } from '../models/UserCreate';
import type { UserRead } from '../models/UserRead';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

  /**
   * Auth:Register
   * Registers a new user, then creates an email verification token
   * and sends the new user an email verification link to click.
   * @returns UserRead Successful Response
   * @throws ApiError
   */
  public static authRegisterApiV1AuthRegisterPost({
    requestBody,
  }: {
    requestBody: UserCreate,
  }): CancelablePromise<UserRead> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/register',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad Request`,
        422: `Validation Error`,
      },
    });
  }

  /**
   * Auth:Verification
   * Sends an email verification link to the requested email.
   * @returns any Successful Response
   * @throws ApiError
   */
  public static authVerificationApiV1AuthVerificationPost({
    requestBody,
  }: {
    requestBody: Body_auth_verification_api_v1_auth_verification_post,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/verification',
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
   * Auth:Confirmation
   * Confirms if the supplied verification token for the user is valid,
   * then updates the is_verified status for the user.
   * @returns void
   * @throws ApiError
   */
  public static authConfirmationApiV1AuthConfirmationGet({
    token,
    csrf,
  }: {
    token: string,
    csrf: string,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/auth/confirmation',
      query: {
        'token': token,
        'csrf': csrf,
      },
      errors: {
        300: `Successful Response`,
        400: `Bad Request`,
        401: `Unauthorized`,
        404: `Not Found`,
        422: `Validation Error`,
      },
    });
  }

  /**
   * Auth:Forgot Password
   * Emails a forgot password reset token to the user by email.
   * @returns any Successful Response
   * @throws ApiError
   */
  public static authForgotPasswordApiV1AuthForgotPasswordPost({
    requestBody,
  }: {
    requestBody: Body_auth_forgot_password_api_v1_auth_forgot_password_post,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/forgot-password',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `Unauthorized`,
        404: `Not Found`,
        422: `Validation Error`,
      },
    });
  }

  /**
   * Auth:Reset Password
   * Updates the user password for the subject in the request token.
   * @returns UserRead Successful Response
   * @throws ApiError
   */
  public static authResetPasswordApiV1AuthResetPasswordPost({
    requestBody,
  }: {
    requestBody: Body_auth_reset_password_api_v1_auth_reset_password_post,
  }): CancelablePromise<UserRead> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/reset-password',
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
   * Auth:Access
   * Authenticates the user and grants them an access and a refresh token.
   * @returns BearerResponse Successful Response
   * @throws ApiError
   */
  public static authAccessApiV1AuthAccessPost({
    formData,
  }: {
    formData: Body_auth_access_api_v1_auth_access_post,
  }): CancelablePromise<BearerResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/access',
      formData: formData,
      mediaType: 'application/x-www-form-urlencoded',
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        422: `Validation Error`,
      },
    });
  }

  /**
   * Auth:Refresh
   * Refreshes current user access token and refresh tokens.
   * @returns BearerResponse Successful Response
   * @throws ApiError
   */
  public static authRefreshApiV1AuthRefreshPost(): CancelablePromise<BearerResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/refresh',
      errors: {
        401: `Unauthorized`,
        404: `Not Found`,
      },
    });
  }

  /**
   * Auth:Revoke
   * Revokes current user access token by adding it to the denylist.
   * @returns BearerResponse Successful Response
   * @throws ApiError
   */
  public static authRevokeApiV1AuthRevokeDelete(): CancelablePromise<BearerResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/auth/revoke',
    });
  }

  /**
   * Auth:Logout
   * Logout the current active user by access token and invalidates token id.
   * @returns BearerResponse Successful Response
   * @throws ApiError
   */
  public static authLogoutApiV1AuthLogoutDelete(): CancelablePromise<BearerResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/auth/logout',
      errors: {
        401: `Unauthorized`,
        404: `Not Found`,
      },
    });
  }

}
