import { useNavigate } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { Button, Stack } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { useTheme } from '~/providers/theme';
import { ClientRead } from '~/shared/api';
import { ViewIcon } from '~/shared/icons';

const ClientDeleteFormDialog = clientOnly(
  () => import('~/widgets/form-dialogs/client-delete.ui')
);
const ClientEditFormDialog = clientOnly(
  () => import('~/widgets/form-dialogs/client-edit.ui')
);

interface IClientsTableActionsProps {
  client: ClientRead;
}

const ClientsTableActions: Component<IClientsTableActionsProps> = (props) => {
  const [theme] = useTheme();
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
