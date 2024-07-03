import { ParentComponent } from 'solid-js';
import { DialogLinkProps } from '../model/dialog.types';

const DialogLink: ParentComponent<DialogLinkProps> = (props) => {
  const clickAction = () => {
    props.handleOpen();
  };
  return <a onClick={clickAction}>{props.children}</a>;
};

export default DialogLink;
