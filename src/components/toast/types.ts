import { Toast as ToastMessage } from 'solid-toast';
import { BOOSTRAP_CONTEXTUAL_VARIENT } from '~/components/theme';

export type ToastAlertProps = {
  t: ToastMessage;
  title: string;
  message: string;
  bg?: BOOSTRAP_CONTEXTUAL_VARIENT;
};
