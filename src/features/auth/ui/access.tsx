import { Button } from 'solid-bootstrap';
import { JSX, ParentComponent, Show, createEffect } from 'solid-js';
import { useAuth0, webAuthAuthorize } from '~/features/auth';

type AuthorizedAccessProps = {
  fallback?: JSX.Element;
  children: JSX.Element;
};

const AuthorizedAccess: ParentComponent<AuthorizedAccessProps> = (props) => {
  'use client';
  const [authState, authAct] = useAuth0();
  const loginAction = async () => {
    await webAuthAuthorize(authAct.webAuth, authAct.scopes);
  };
  createEffect(() => {
    if (!authAct.isAuthenticated()) {
      authAct.login();
    }
  });
  return (
    <Show when={authAct.isInitialized()}>
      <Show
        when={authAct.isAuthenticated()}
        fallback={props.fallback ?? <Button onClick={loginAction}>Login</Button>}
      >
        <Show when={authState.accessToken.length > 0}>{props.children}</Show>
      </Show>
    </Show>
  );
};

export default AuthorizedAccess;
