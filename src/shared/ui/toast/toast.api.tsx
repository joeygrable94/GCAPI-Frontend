import { toaster } from '@kobalte/core/toast';
import { createMemo, JSX, Match, Switch } from 'solid-js';
import { ThemeElementColor } from '../ui.constants';
import { ToastApiOptions } from './toast.types';
import Toast from './toast.ui';

const show = (title: string, message: string, options?: ToastApiOptions): number => {
  return toaster.show((props) => (
    <Toast
      id={props.toastId}
      label={title}
      color={options?.color}
      curve={options?.curve}
      size={options?.size}
      progressSize={options?.progressSize ?? options?.size}
      progressCurve={options?.progressCurve ?? options?.curve}
    >
      {message}
    </Toast>
  ));
};

const info = (title: string, message: string, options?: ToastApiOptions): number => {
  return toaster.show((props) => (
    <Toast
      id={props.toastId}
      label={title}
      color="info"
      curve={options?.curve}
      size={options?.size}
      progressSize={options?.progressSize ?? options?.size}
      progressCurve={options?.progressCurve ?? options?.curve}
    >
      {message}
    </Toast>
  ));
};

const success = (title: string, message: string, options?: ToastApiOptions): number => {
  return toaster.show((props) => (
    <Toast
      id={props.toastId}
      label={title}
      color="success"
      curve={options?.curve}
      size={options?.size}
      progressSize={options?.progressSize ?? options?.size}
      progressCurve={options?.progressCurve ?? options?.curve}
    >
      {message}
    </Toast>
  ));
};

const error = (title: string, message: string, options?: ToastApiOptions): number => {
  return toaster.show((props) => (
    <Toast
      id={props.toastId}
      label={title}
      color="error"
      curve={options?.curve}
      size={options?.size}
      progressSize={options?.progressSize ?? options?.size}
      progressCurve={options?.progressCurve ?? options?.curve}
    >
      {message}
    </Toast>
  ));
};

const warning = (title: string, message: string, options?: ToastApiOptions): number => {
  return toaster.show((props) => (
    <Toast
      id={props.toastId}
      label={title}
      color="warning"
      curve={options?.curve}
      size={options?.size}
      progressSize={options?.progressSize ?? options?.size}
      progressCurve={options?.progressCurve ?? options?.curve}
    >
      {message}
    </Toast>
  ));
};

const promise = <T, U>(
  promise: Promise<T> | (() => Promise<T>),
  state: {
    loading?: JSX.Element;
    success?: (data: T) => JSX.Element;
    error?: (error: U) => JSX.Element;
  },
  options?: ToastApiOptions
) => {
  return toaster.promise(promise, (props) => {
    const colorState = createMemo<ThemeElementColor | undefined>(() => {
      let color: ThemeElementColor | undefined = options?.color;
      switch (props.state) {
        case 'pending':
          color = undefined;
          break;
        case 'fulfilled':
          color = 'success';
          break;
        case 'rejected':
          color = 'error';
          break;
      }
      return color;
    });
    return (
      <Toast
        id={props.toastId}
        label="Loading..."
        classList={{
          toast: true,
          'toast-loading': props.state === 'pending',
          'toast-success': props.state === 'fulfilled',
          'toast-error': props.state === 'rejected'
        }}
        color={colorState()}
        curve={options?.curve}
        size={options?.size}
        progressSize={options?.progressSize ?? options?.size}
        progressCurve={options?.progressCurve ?? options?.curve}
      >
        <Switch>
          <Match when={props.state === 'pending'}>{state.loading}</Match>
          <Match when={props.state === 'fulfilled'}>
            {state.success?.(props.data as unknown as T)}
          </Match>
          <Match when={props.state === 'rejected'}>
            {state.error?.(props.error as unknown as U)}
          </Match>
        </Switch>
      </Toast>
    );
  });
};

const dismiss = (id: number): number => {
  return toaster.dismiss(id);
};

const toast = {
  show,
  info,
  success,
  error,
  warning,
  promise,
  dismiss
};

export default toast;
