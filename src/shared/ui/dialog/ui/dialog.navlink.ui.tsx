import { ParentComponent } from 'solid-js';
import { DialogLinkProps } from '../model/dialog.types';

const DialogNavLink: ParentComponent<DialogLinkProps> = (props) => {
  return (
    <a
      onClick={props.handleOpen}
      class="no-underlinehover:text-inherit rounded-full px-3 py-2 font-medium text-gray-900"
    >
      {props.children}
    </a>
  );
};

export default DialogNavLink;
