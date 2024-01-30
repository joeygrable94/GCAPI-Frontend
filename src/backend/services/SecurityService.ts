/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CsrfToken } from '../models/CsrfToken';
import type { EncryptedMessage } from '../models/EncryptedMessage';
import type { PlainMessage } from '../models/PlainMessage';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SecurityService {
  /**
   * Secure:Test Security Scope
   * @returns any Successful Response
   * @throws ApiError
   */
  public static secureTestSecurityScopeApiV1TestScopeGet(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/test-scope',
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
  public static secureGetCsrfApiV1CsrfGet(): CancelablePromise<CsrfToken> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/csrf',
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
   * @returns any Successful Response
   * @throws ApiError
   */
  public static secureCheckCsrfApiV1CsrfPost(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/csrf',
    });
  }
  /**
   * Secure:Secure Encrypt Message
   * Encrypts a message using AES signed by an RSA key.
   * @returns EncryptedMessage Successful Response
   * @throws ApiError
   */
  public static secureSecureEncryptMessageApiV1EncryptMessagePost({
    requestBody,
  }: {
    requestBody: PlainMessage,
  }): CancelablePromise<EncryptedMessage> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/encrypt/message',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Secure:Secure Decrypt Message
   * Decrypts and verifies the RSA signature of a securely encrypted message.
   * @returns PlainMessage Successful Response
   * @throws ApiError
   */
  public static secureSecureDecryptMessageApiV1DecryptMessagePost({
    requestBody,
  }: {
    requestBody: EncryptedMessage,
  }): CancelablePromise<PlainMessage> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/decrypt/message',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
