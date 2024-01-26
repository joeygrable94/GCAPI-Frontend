import { isServer } from '@tanstack/solid-query';
import { Container } from 'solid-bootstrap';
import { ErrorBoundary, ParentComponent, createEffect } from 'solid-js';
import {
  // AuthorizedAccess,
  LayoutContext,
  createLayoutMutable,
  saveDarkMode
} from '~/components';
import Navigation from './navigation';

const MainLayout: ParentComponent = (props) => {
  let rootDiv: HTMLElement | null = null;
  const layout = createLayoutMutable({});
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
      <ErrorBoundary fallback={<>Navigation Error</>}>
        <Navigation />
      </ErrorBoundary>
      <Container>
        {/* <AuthorizedAccess
          fallback={
            <p class="fs-2 my-5 text-center">You must log in to access this page.</p>
          }
        > */}
        {props.children}
        {/* </AuthorizedAccess> */}
      </Container>
    </LayoutContext.Provider>
  );
};

export default MainLayout;
