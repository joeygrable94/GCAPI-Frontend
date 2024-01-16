import { ParentComponent, Show } from 'solid-js';
import { isServer } from 'solid-js/web';
import { useAuth0 } from './context';

const RequireAuthorization: ParentComponent = (props) => {
  const auth0 = useAuth0();

  if (!auth0.isAuthenticated() && !isServer) {
    auth0.login();
  }

  return (
    <>
      <Show when={auth0.isInitialized()}>
        <Show when={auth0.isAuthenticated()} fallback={<p>Login Required</p>}>
          <Show when={auth0.accessToken()}>{props.children}</Show>
        </Show>
      </Show>
    </>
  );
};

export default RequireAuthorization;
