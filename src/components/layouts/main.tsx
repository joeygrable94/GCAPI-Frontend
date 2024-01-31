import { isServer } from '@tanstack/solid-query';
import { Container } from 'solid-bootstrap';
import { ErrorBoundary, ParentComponent, createEffect } from 'solid-js';
import {
  CurrentUser,
  GuestUser,
  LayoutContext,
  createLayoutMutable,
  saveDarkMode
} from '~/components';
import { log } from '~/utils';
import Navigation from './navigation';

type MainLayoutProps = {
  user: CurrentUser | GuestUser;
  darkMode?: boolean;
};

const MainLayout: ParentComponent<MainLayoutProps> = (props) => {
  let rootDiv: HTMLElement | null = null;
  const layout = createLayoutMutable({
    darkMode: props.darkMode ?? false
  });
  log('layout', layout.darkMode);
  createEffect(() => {
    if (isServer) return;
    saveDarkMode(layout.darkMode);
    document.documentElement.setAttribute(
      'data-bs-theme',
      layout.darkMode ? 'dark' : 'light'
    );
    document.body.setAttribute('data-bs-theme', layout.darkMode ? 'dark' : 'light');
    rootDiv = document.getElementById('app');
    if (rootDiv !== null)
      rootDiv.setAttribute('data-bs-theme', layout.darkMode ? 'dark' : 'light');
  });
  return (
    <LayoutContext.Provider value={layout}>
      <ErrorBoundary fallback={<>Layout Navigation Error</>}>
        <Navigation user={props.user} />
      </ErrorBoundary>
      <Container>
        <ErrorBoundary fallback={<>Layout Content Error</>}>
          {props.children}
        </ErrorBoundary>
      </Container>
    </LayoutContext.Provider>
  );
};

export default MainLayout;
