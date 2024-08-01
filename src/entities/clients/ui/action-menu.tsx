import { Component } from 'solid-js';
import { ClientCreateFormDialog } from '~/widgets/form-dialogs';

// type ClientsActionsMenuProps = {};

const ClientsActionsMenu: Component = () => {
  return (
    <div class='my-2'>
      <ClientCreateFormDialog triggerType='link' triggerElm={<>+ Create</>} />
    </div>
  );
};

export default ClientsActionsMenu;
