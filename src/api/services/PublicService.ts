/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PublicService {

  /**
   * Status
   * Fetches the current API status.
   * @returns any Successful Response
   * @throws ApiError
   */
  public static statusApiV1StatusGet(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/status',
    });
  }

}
