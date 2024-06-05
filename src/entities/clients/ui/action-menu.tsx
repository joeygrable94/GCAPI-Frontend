import { clientOnly } from '@solidjs/start';
import { Nav } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { CreateIcon } from '~/shared/icons';

const ClientCreateFormDialog = clientOnly(
  () => import('~/widgets/form-dialogs/client-create.ui')
);

// type ClientsActionsMenuProps = {};

const ClientsActionsMenu: Component = () => {
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
