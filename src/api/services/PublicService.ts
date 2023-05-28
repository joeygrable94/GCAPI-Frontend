/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PublicService {

  /**
   * Public:Status
   * @returns any Successful Response
   * @throws ApiError
   */
  public static publicStatusApiV1StatusGet({
    page = 1,
    speak,
  }: {
    page?: number,
    speak?: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/status',
      query: {
        'page': page,
        'speak': speak,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
