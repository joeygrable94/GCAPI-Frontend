/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
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
   * @returns any Successful Response
   * @throws ApiError
   */
  public static publicStatusApiV1StatusGet({
    message,
  }: {
    message?: (string | null),
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/status',
      query: {
        'message': message,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Public:Rate Limited Multiple
   * @returns any Successful Response
   * @throws ApiError
   */
  public static publicRateLimitedMultipleApiV1RateLimitedMultipleGet({
    message,
  }: {
    message?: (string | null),
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/rate-limited-multiple',
      query: {
        'message': message,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
