import { Container } from 'solid-bootstrap';
import { ParentComponent, createEffect } from 'solid-js';
import { LayoutContext, createLayoutMutable, saveDarkMode } from '~/components';
import Navigation from './navigation';

const MainLayout: ParentComponent = (props) => {
  let appDiv: HTMLElement;
  const layout = createLayoutMutable({});

  createEffect(() => {
    saveDarkMode(layout.darkMode);
    document.documentElement.setAttribute(
      'data-bs-theme',
      layout.darkMode ? 'dark' : 'light'
    );
    document.body.setAttribute('data-bs-theme', layout.darkMode ? 'dark' : 'light');
    appDiv = document.getElementById('app') as HTMLElement;
    appDiv.setAttribute('data-bs-theme', layout.darkMode ? 'dark' : 'light');
  });
  return (
    <LayoutContext.Provider value={layout}>
      <Navigation />
      <Container>{props.children}</Container>
    </LayoutContext.Provider>
  );
};

export default MainLayout;
