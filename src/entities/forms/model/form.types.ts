import { FieldApi } from '@tanstack/solid-form';
import { ApiError } from '~/shared/api';

export interface IFormFieldInfoProps {
  field: FieldApi<any, any, any, any>;
}

export type TFormActionResponse<T> = {
  success: boolean;
  messsage: string;
  data?: T;
  errors?: ApiError[] | Error[];
};
