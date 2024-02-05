/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TaskState } from '../models/TaskState';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
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
  public static tasksGetStatusApiV1TasksTaskIdGet({
    taskId,
  }: {
    taskId: any,
  }): CancelablePromise<TaskState> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/tasks/{task_id}',
      path: {
        'task_id': taskId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
