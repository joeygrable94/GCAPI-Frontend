import DarkModeIcon from '@suid/icons-material/DarkMode';
import LightModeIcon from '@suid/icons-material/LightMode';
import { Icon, Link, useTheme } from '@suid/material';
import { Component, createMemo, Match, Switch } from 'solid-js';
import { useThemeState } from '~/features';

const ColorModeSwitcher: Component = () => {
  const theme = useTheme();
  const [themeState, themeActions] = useThemeState();
  const colorModeText = createMemo(() => {
    if (themeState.mode === 'dark') {
      return 'Toggle light color mode.';
    }
    return 'Toggle dark color mode.';
  });

  return (
    <>
      <Link
        class="sidebar-icon"
        onClick={themeActions.toggleColorMode}
        color={
          themeState.mode === 'dark'
            ? theme.palette.common.white
            : theme.palette.common.black
        }
        sx={{
          cursor: 'pointer'
        }}
      >
        <Icon fontSize="large" aria-label={colorModeText()} />
        <Switch>
          <Match when={themeState.mode === 'dark'}>
            <LightModeIcon aria-label={colorModeText()} fontSize="large" />
          </Match>
          <Match when={themeState.mode === 'light'}>
            <DarkModeIcon aria-label={colorModeText()} fontSize="large" />
          </Match>
        </Switch>
      </Link>
    </>
  );
};

export default ColorModeSwitcher;
