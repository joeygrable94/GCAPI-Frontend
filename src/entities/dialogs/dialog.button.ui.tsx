import { Button } from 'solid-bootstrap';
import { ParentComponent } from 'solid-js';
import { useThemeContext } from '~/providers/theme';
import { DialogButtonProps } from './dialog.types';

const DialogButton: ParentComponent<DialogButtonProps> = (props) => {
  const theme = useThemeContext();
  return (
    <Button
      size="sm"
      variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
      onClick={props.handleOpen}
    >
      {props.children}
    </Button>
  );
};

export default DialogButton;
