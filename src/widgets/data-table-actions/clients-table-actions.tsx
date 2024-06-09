import { useNavigate } from '@solidjs/router';
import { Button, Stack } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { useTheme } from '~/providers/theme';
import { ClientRead } from '~/shared/api';
import { ViewIcon } from '~/shared/icons';
import { ClientDeleteFormDialog, ClientEditFormDialog } from '../form-dialogs';

interface IClientsTableActionsProps {
  client: ClientRead;
}

const ClientsTableActions: Component<IClientsTableActionsProps> = (props) => {
  const [theme] = useTheme();
  const navigate = useNavigate();
  const handleNavClick = () => {
    if (props.client.id === undefined) return;
    return navigate(`/clients/${props.client.id}`);
  };
  return (
    <Stack direction="horizontal" gap={2} class="d-flex flex-row flex-nowrap">
      <Button
        size="sm"
        variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={handleNavClick}
      >
        <ViewIcon />
      </Button>
      <ClientEditFormDialog client={props.client} />
      <ClientDeleteFormDialog client={props.client} />
    </Stack>
  );
};

export default ClientsTableActions;
