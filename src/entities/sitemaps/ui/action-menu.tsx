import { CreateIcon } from '@getcommunity/gcui/icon';
import { Component } from 'solid-js';
import { WebsiteRead } from '~/shared/api';
import { WebsiteSitemapCreateFormDialog } from '~/widgets/form-dialogs';

type WebsiteSitemapsActionsMenuProps = {
  website: WebsiteRead;
};

const WebsiteSitemapsActionsMenu: Component<WebsiteSitemapsActionsMenuProps> = (
  props
) => {
  return (
    <div class="my-2">
      <WebsiteSitemapCreateFormDialog
        website={props.website}
        triggerType="nav"
        triggerElm={
          <>
            <CreateIcon /> Add Sitemap
          </>
        }
      />
    </div>
  );
};

export default WebsiteSitemapsActionsMenu;
