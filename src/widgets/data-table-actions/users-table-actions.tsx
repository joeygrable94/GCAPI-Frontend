import { useNavigate } from '@solidjs/router';
import { Button, Stack } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { useTheme } from '~/providers/theme';
import { UserReadAsAdmin, UserReadAsManager } from '~/shared/api';
import { ViewIcon } from '~/shared/icons';
import { UserEditFormDialog } from '../form-dialogs';

interface IUsersTableActionsProps {
  user: UserReadAsAdmin | UserReadAsManager;
}

const UsersTableActions: Component<IUsersTableActionsProps> = (props) => {
  const [theme] = useTheme();
  const navigate = useNavigate();
  return (
    <Stack direction="horizontal" gap={2} class="d-flex flex-row flex-nowrap">
      <Button
        size="sm"
        variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => navigate(`/users/${props.user.id}`)}
      >
        <ViewIcon />
      </Button>
      <UserEditFormDialog user={props.user} />
    </Stack>
  );
};

export default UsersTableActions;
