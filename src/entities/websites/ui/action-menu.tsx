import { Component } from 'solid-js';
import { CreateIcon } from '~/shared/ui/icon';
import { WebsiteCreateFormDialog } from '~/widgets/form-dialogs';

// type WebsitesActionsMenuProps = {};

const WebsitesActionsMenu: Component = () => {
  return (
    <div class="my-2">
      <WebsiteCreateFormDialog
        triggerType="nav"
        triggerElm={
          <>
            <CreateIcon /> Create
          </>
        }
      />
    </div>
  );
};

export default WebsitesActionsMenu;
