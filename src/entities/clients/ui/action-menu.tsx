import { Nav } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { CreateIcon } from '~/shared/icons';
import { ClientCreateFormDialog } from '~/widgets/form-dialogs';

type ClientsActionsMenuProps = {};

const ClientsActionsMenu: Component<ClientsActionsMenuProps> = (props) => {
  return (
    <Nav class="my-2">
      <ClientCreateFormDialog
        triggerType="nav"
        triggerElm={
          <>
            <CreateIcon /> Create
          </>
        }
      />
    </Nav>
  );
};

export default ClientsActionsMenu;
