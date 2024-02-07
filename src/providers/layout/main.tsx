import { Container } from 'solid-bootstrap';
import { ErrorBoundary, ParentComponent, createEffect, onMount } from 'solid-js';
import { PrimaryNavigation } from '~/features/nav';
import { LayoutContext, createLayoutMutable, saveDarkMode } from '~/providers/theme';

type MainLayoutProps = {
  darkMode?: boolean | undefined;
};

let pageDiv: HTMLDivElement;

const MainLayout: ParentComponent<MainLayoutProps> = (props) => {
  let rootDiv: HTMLElement | null = null;
  const layout = createLayoutMutable({
    darkMode: props.darkMode ?? false
  });
  const setPageTheme = () => {
    saveDarkMode(layout.darkMode);
    document.documentElement.setAttribute(
      'data-bs-theme',
      layout.darkMode ? 'dark' : 'light'
    );
    document.body.setAttribute('data-bs-theme', layout.darkMode ? 'dark' : 'light');
    rootDiv = document.getElementById('app');
    if (rootDiv !== null)
      rootDiv.setAttribute('data-bs-theme', layout.darkMode ? 'dark' : 'light');
  };
  onMount(() => setPageTheme());
  createEffect(() => setPageTheme());
  return (
    <div
      ref={pageDiv}
      id="page"
      class="viewport-height"
      data-bs-theme={layout.darkMode ? 'dark' : 'light'}
    >
      <LayoutContext.Provider value={layout}>
        <ErrorBoundary fallback={<>Layout Navigation Error</>}>
          <PrimaryNavigation darkMode={props.darkMode} />
        </ErrorBoundary>
        <Container>
          <ErrorBoundary fallback={<>Layout Content Error</>}>
            {props.children}
          </ErrorBoundary>
        </Container>
      </LayoutContext.Provider>
    </div>
  );
};

export default MainLayout;
