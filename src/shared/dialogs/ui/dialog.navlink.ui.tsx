import { NavLink } from 'solid-bootstrap';
import { ParentComponent } from 'solid-js';
import { DialogLinkProps } from '../model/dialog.types';

const DialogNavLink: ParentComponent<DialogLinkProps> = (props) => {
  return <NavLink onClick={props.handleOpen}>{props.children}</NavLink>;
};

export default DialogNavLink;
