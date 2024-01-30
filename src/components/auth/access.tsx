import { Button } from 'solid-bootstrap';
import { JSX, ParentComponent, Show, createEffect } from 'solid-js';
import { useAuth } from './context';

type AuthAccessProps = {
  fallback?: JSX.Element;
  children: JSX.Element;
};

const AuthAccess: ParentComponent<AuthAccessProps> = (props) => {
  const [authState, authAct] = useAuth();
  createEffect(() => {
    if (!authAct.isAuthenticated()) {
      authAct.login();
    }
  });
  return (
    <Show when={authAct.isInitialized()}>
      <Show
        when={authAct.isAuthenticated()}
        fallback={
          props.fallback ?? (
            <Button onClick={async () => await authAct.authorize()}>Login</Button>
          )
        }
      >
        <Show when={authState.accessToken.length > 0}>{props.children}</Show>
      </Show>
    </Show>
  );
};

export default AuthAccess;
