import { Alert } from 'solid-bootstrap';
import { JSX, ParentComponent, Show } from 'solid-js';
import { useUser } from '~/providers/user';

type AccessByRoleProps = {
  fallback?: JSX.Element;
  children: JSX.Element;
  role: string;
};

const AccessByRole: ParentComponent<AccessByRoleProps> = (props) => {
  const [userState, userAct] = useUser();
  return (
    <Show
      when={userState.role === props.role}
      fallback={
        props.fallback ?? (
          <Alert color="danger">
            You do not have permission to access this resource.
          </Alert>
        )
      }
    >
      {props.children}
    </Show>
  );
};

export default AccessByRole;
