import { Alert } from '@suid/material';
import { Match, Switch } from 'solid-js';

interface FormMessageProps {
  info?: string;
  error?: string;
  warning?: string;
  success?: string;
  messsage?: string;
}

const FormMessage = (props: FormMessageProps) => (
  <Switch>
    <Match when={props.info}>
      <Alert severity="info">{props.info}</Alert>
    </Match>
    <Match when={props.error}>
      <Alert severity="error">{props.error}</Alert>
    </Match>
    <Match when={props.warning}>
      <Alert severity="warning">{props.warning}</Alert>
    </Match>
    <Match when={props.success}>
      <Alert severity="success">{props.success}</Alert>
    </Match>
    <Match when={props.messsage}>
      <Alert>{props.messsage}</Alert>
    </Match>
  </Switch>
);

export default FormMessage;
