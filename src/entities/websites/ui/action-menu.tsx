import { CreateIcon } from '@getcommunity/gcui/icon';
import { Component } from 'solid-js';
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
