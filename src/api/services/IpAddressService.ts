/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IpAddressCreate } from '../models/IpAddressCreate';
import type { IpAddressReadRelations } from '../models/IpAddressReadRelations';
import type { IpAddressUpdate } from '../models/IpAddressUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class IpAddressService {

  /**
   * Ipaddress:Read Ipaddress List
   * @returns IpAddressReadRelations Successful Response
   * @throws ApiError
   */
  public static ipaddressReadIpaddressListApiV1IpGet({
    page = 1,
  }: {
    page?: number,
  }): CancelablePromise<Array<IpAddressReadRelations>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/ip/',
      query: {
        'page': page,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Ipaddress:Create Ipaddress
   * @returns IpAddressReadRelations Successful Response
   * @throws ApiError
   */
  public static ipaddressCreateIpaddressApiV1IpPost({
    requestBody,
  }: {
    requestBody: IpAddressCreate,
  }): CancelablePromise<IpAddressReadRelations> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/ip/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Ipaddress:Read Ipaddress
   * @returns IpAddressReadRelations Successful Response
   * @throws ApiError
   */
  public static ipaddressReadIpaddressApiV1IpIdGet({
    id,
  }: {
    id: string,
  }): CancelablePromise<IpAddressReadRelations> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/ip/{id}',
      path: {
        'id': id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Ipaddress:Delete Ipaddress
   * @returns any Successful Response
   * @throws ApiError
   */
  public static ipaddressDeleteIpaddressApiV1IpIdDelete({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/ip/{id}',
      path: {
        'id': id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Ipaddress:Update Ipaddress
   * @returns IpAddressReadRelations Successful Response
   * @throws ApiError
   */
  public static ipaddressUpdateIpaddressApiV1IpIdPatch({
    id,
    requestBody,
  }: {
    id: string,
    requestBody: IpAddressUpdate,
  }): CancelablePromise<IpAddressReadRelations> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/ip/{id}',
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
