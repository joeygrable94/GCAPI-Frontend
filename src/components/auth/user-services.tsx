import { Button } from 'solid-bootstrap';
import { JSX, ParentComponent, Show } from 'solid-js';
import { useAuth0 } from './context';

type AuthorizedAccessProps = {
  fallback?: JSX.Element;
  children: JSX.Element;
};

export const AuthorizedAccess: ParentComponent<AuthorizedAccessProps> = (props) => {
  const [authState, authAct] = useAuth0();
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
