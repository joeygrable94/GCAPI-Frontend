import { ParentComponent } from 'solid-js';
import { DialogLinkProps } from './dialog.types';

const DialogLink: ParentComponent<DialogLinkProps> = (props) => {
  return <a onClick={props.handleOpen}>{props.children}</a>;
};

export default DialogLink;
