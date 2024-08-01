import { ViewIcon } from '@getcommunity/gcui/icon';
import { Button } from '@kobalte/core/button';
import { useNavigate } from '@solidjs/router';
import { Component } from 'solid-js';
import { useTheme } from '~/providers/theme';
import { ClientRead } from '~/shared/api';
import { ClientDeleteFormDialog, ClientEditFormDialog } from '~/widgets/form-dialogs';

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
    <div class='d-flex flex-gap-2 flex-row flex-nowrap'>
      <Button
        class={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={handleNavClick}
      >
        <ViewIcon />
      </Button>
      <ClientEditFormDialog client={props.client} />
      <ClientDeleteFormDialog client={props.client} />
    </div>
  );
};

export default ClientsTableActions;
