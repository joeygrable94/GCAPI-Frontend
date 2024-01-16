import { Container } from 'solid-bootstrap';
import { ParentComponent, createEffect } from 'solid-js';
import { LayoutContext, createLayoutMutable, saveDarkMode } from '~/components/theme';
import { AuthProvider } from '../auth';
import Navigation from './navigation';

let appDiv: HTMLElement;

const MainLayout: ParentComponent = (props) => {
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
      <AuthProvider>
        <Navigation />
        <Container>{props.children}</Container>
      </AuthProvider>
    </LayoutContext.Provider>
  );
};

export default MainLayout;
