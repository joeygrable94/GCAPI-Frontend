import { Container } from 'solid-bootstrap';
import { ParentComponent, createEffect } from 'solid-js';
import { AuthProvider } from '~/components';
import { LayoutContext, createLayoutMutable, saveDarkMode } from '~/components/theme';
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
      <AuthProvider>
        <Navigation />
        <Container>{props.children}</Container>
      </AuthProvider>
    </LayoutContext.Provider>
  );
};

export default MainLayout;
