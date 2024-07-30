import { ViewIcon } from '@getcommunity/gcui/icon';
import { Button } from '@kobalte/core/button';
import { useNavigate } from '@solidjs/router';
import { Component } from 'solid-js';
import { useTheme } from '~/providers/theme';
import { UserReadAsAdmin, UserReadAsManager } from '~/shared/api';
import { UserEditFormDialog } from '~/widgets/form-dialogs';

interface IUsersTableActionsProps {
  user: UserReadAsAdmin | UserReadAsManager;
}

const UsersTableActions: Component<IUsersTableActionsProps> = (props) => {
  const [theme] = useTheme();
  const navigate = useNavigate();
  return (
    <div class="d-flex flex-gap-2 flex-row flex-nowrap">
      <Button
        class={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => navigate(`/users/${props.user.id}`)}
      >
        <ViewIcon />
      </Button>
      <UserEditFormDialog user={props.user} />
    </div>
  );
};

export default UsersTableActions;
