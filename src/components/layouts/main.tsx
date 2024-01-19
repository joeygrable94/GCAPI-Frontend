import { Container } from 'solid-bootstrap';
import { ParentComponent, Show, createEffect } from 'solid-js';
import { isServer } from 'solid-js/web';
import {
  LayoutContext,
  createLayoutMutable,
  saveDarkMode,
  useAuth0
} from '~/components';
import Navigation from './navigation';

const MainLayout: ParentComponent = (props) => {
  const [authState, authAct] = useAuth0();
  if (!authAct.isAuthenticated() && !isServer) {
    authAct.login();
  }

  let rootDiv: HTMLElement;
  const layout = createLayoutMutable({});

  createEffect(() => {
    saveDarkMode(layout.darkMode);
    document.documentElement.setAttribute(
      'data-bs-theme',
      layout.darkMode ? 'dark' : 'light'
    );
    document.body.setAttribute('data-bs-theme', layout.darkMode ? 'dark' : 'light');
    rootDiv = document.getElementById('root') as HTMLElement;
    rootDiv.setAttribute('data-bs-theme', layout.darkMode ? 'dark' : 'light');
  });
  return (
    <LayoutContext.Provider value={layout}>
      <Navigation />
      <Container>
        <Show when={authAct.isInitialized()}>{props.children}</Show>
      </Container>
    </LayoutContext.Provider>
  );
};

export default MainLayout;
