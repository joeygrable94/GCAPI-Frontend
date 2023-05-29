import { Component, JSX, Show } from 'solid-js';
import { isServer } from 'solid-js/web';
import { useAuth0 } from './context';

interface RequiresAuthProps {
  children: JSX.Element;
}

export const RequiresAuth: Component<RequiresAuthProps> = (props) => {
  const auth = useAuth0();

  if (!auth?.isAuthenticated() && !isServer) {
    auth?.loginWithRedirect();
  }

  return (
    <>
      <Show when={auth?.isInitialized()}>
        <Show when={auth?.isAuthenticated()} fallback={'login'}>
          <Show when={auth?.getToken()}>{props.children}</Show>
        </Show>
      </Show>
    </>
  );
};
