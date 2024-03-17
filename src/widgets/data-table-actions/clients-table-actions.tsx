import { useNavigate } from '@solidjs/router';
import { Button, Stack } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { useThemeContext } from '~/features/theme';
import { ClientRead } from '~/shared/api';
import { ViewIcon } from '~/shared/icons';
import { ClientDeleteFormDialog, ClientEditFormDialog } from '~/widgets/form-dialogs';

interface IClientsTableActionsProps {
  client: ClientRead;
}

const ClientsTableActions: Component<IClientsTableActionsProps> = (props) => {
  const theme = useThemeContext();
  const navigate = useNavigate();
  return (
    <Stack direction="horizontal" gap={2} class="d-flex flex-row flex-nowrap">
      <Button
        size="sm"
        variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => navigate(`/clients/${props.client.id}`)}
      >
        <ViewIcon />
      </Button>
      <ClientEditFormDialog client={props.client} />
      <ClientDeleteFormDialog client={props.client} />
    </Stack>
  );
};

export default ClientsTableActions;
