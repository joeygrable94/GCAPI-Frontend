import { Component } from 'solid-js';
import { AlertMessage } from '~/shared/ui/alert';

const AlertsExample: Component = () => {
  return (
    <div id="alerts" class="flex flex-col gap-1 pb-24 pt-12">
      <h2 class="text-3xl font-bold">Alerts</h2>
      <p class="text-lg">This section demonstrates various alert messages.</p>
      <AlertMessage message="This is a success message." color="success" />
      <AlertMessage message="This is a error message." color="error" />
      <AlertMessage message="This is a warning message." color="warning" />
      <AlertMessage message="This is a info message." color="info" />
      <AlertMessage message="This is a light message." color="light" />
      <AlertMessage message="This is a dark message." color="dark" />
      <p class="mt-1">Closable alert messages.</p>
      <AlertMessage
        message="This is a closable success message."
        color="success"
        closeable
      />
      <AlertMessage
        message="This is a closable error message that also does an action when clicked."
        color="error"
        closeable
        onClose={() => console.log('Alert closed')}
      />
      <AlertMessage
        message="This is a closable warning message with a timeout of 3 seconds. It will trigger once clicked."
        color="warning"
        closeable
        timeout={3000}
        triggerTimeoutOnClick
      />
      <AlertMessage message="This is a closable info message." color="info" closeable />
      <AlertMessage
        message="This is a closable light message."
        color="light"
        closeable
      />
      <AlertMessage message="This is a closable dark message." color="dark" closeable />
    </div>
  );
};

export default AlertsExample;
