import { Component } from 'solid-js';
import { CreateIcon } from '~/shared/ui/icon';
import { ClientCreateFormDialog } from '~/widgets/form-dialogs';

// type ClientsActionsMenuProps = {};

const ClientsActionsMenu: Component = () => {
  return (
    <div class="my-2">
      <ClientCreateFormDialog
        triggerType="link"
        triggerElm={
          <>
            <CreateIcon /> Create
          </>
        }
      />
    </div>
  );
};

export default ClientsActionsMenu;
