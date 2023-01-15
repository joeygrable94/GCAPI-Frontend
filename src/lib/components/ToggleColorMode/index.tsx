import { Button, useColorMode } from '@hope-ui/core';

export default function ToggleColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode}>
      Toggle {colorMode() === 'light' ? 'dark' : 'light'} mode
    </Button>
  );
}
