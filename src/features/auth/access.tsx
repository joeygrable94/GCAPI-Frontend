import { Button } from 'solid-bootstrap';
import { JSX, ParentComponent, Show, createEffect } from 'solid-js';
import { useAuth0 } from '../../providers/auth/context';

type AuthorizedAccessProps = {
  fallback?: JSX.Element;
  children: JSX.Element;
};

const AuthorizedAccess: ParentComponent<AuthorizedAccessProps> = (props) => {
  const [authState, authAct] = useAuth0();
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

export default AuthorizedAccess;
