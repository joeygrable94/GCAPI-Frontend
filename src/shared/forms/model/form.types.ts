import { FieldApi } from '@tanstack/solid-form';

import { ApiError } from '~/shared/api';

export interface IFormFieldInfoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any>;
}

export type TFormActionResponse<T> = {
  success: boolean;
  messsage: string;
  data?: T;
  errors?: ApiError[] | Error[];
};
