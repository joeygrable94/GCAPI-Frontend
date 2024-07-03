import { Button } from '@kobalte/core/button';
import { ParentComponent } from 'solid-js';
import { useTheme } from '~/providers/theme';
import { DialogButtonProps } from '../model/dialog.types';

const DialogButton: ParentComponent<DialogButtonProps> = (props) => {
  const [theme] = useTheme();
  return (
    <Button
      class={theme.darkMode ? 'outline-light' : 'outline-dark'}
      onClick={() => props.handleOpen()}
    >
      {props.children}
    </Button>
  );
};

export default DialogButton;
