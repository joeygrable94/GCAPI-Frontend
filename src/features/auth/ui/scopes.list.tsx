import { Component, Show, createSignal } from 'solid-js';
import { AuthorizedUser, useUser } from '~/features/auth';
import { UserRead, UserReadAsAdmin, UserReadAsManager } from '~/shared/api';

type AuthScopesListProps = {
  user: AuthorizedUser;
};

const AuthScopesList: Component<AuthScopesListProps> = (props) => {
  const [userState, userAct] = useUser();
  const [user, setUser] = createSignal<UserReadAsAdmin | UserReadAsManager | UserRead>(
    props.user
  );
  return (
    <Show when={userState.role === 'admin' || userState.role === 'manager'}>
      <ul>
        {(user() as UserReadAsAdmin | UserReadAsManager).scopes.map((scope) => (
          <li>{scope}</li>
        ))}
      </ul>
    </Show>
  );
};

export default AuthScopesList;
