import { Button } from 'solid-bootstrap';
import { JSX, ParentComponent, Show, createEffect } from 'solid-js';
import { isServer } from 'solid-js/web';
import { useAuth0 } from './context';

type AuthorizedAccessProps = {
  fallback?: JSX.Element;
  children: JSX.Element;
};

const AuthorizedAccess: ParentComponent<AuthorizedAccessProps> = (props) => {
  const [authState, authAct] = useAuth0();
  createEffect(() => {
    if (!isServer) {
      if (!authAct.isAuthenticated()) {
        authAct.login();
      }
    }
  });
  return (
    <Show when={authAct.isInitialized()}>
      <Show
        when={authAct.isAuthenticated()}
        fallback={
          props.fallback ?? (
            <Button
              onClick={async () => (!isServer ? await authAct.authorize() : undefined)}
            >
              Login
            </Button>
          )
        }
      >
        <Show when={authState.accessToken.length > 0}>{props.children}</Show>
      </Show>
    </Show>
  );
};

export default AuthorizedAccess;
