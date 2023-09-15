import { MetaProvider } from '@solidjs/meta';
import { Route, Routes } from '@solidjs/router';
import { lazy, type Component } from 'solid-js';
import { AuthProvider, Navigation, ThemeDefault, ThemeProvider } from '~/features';
import { viewportHeightStyles } from '~/utilities';

const Page404 = lazy(() => import('~/pages/[...404]'));
const Home = lazy(() => import('~/pages/index'));
const Login = lazy(() => import('~/pages/login'));
const Register = lazy(() => import('~/pages/register'));

let tags: any = [];

const App: Component = () => {
  viewportHeightStyles();

  return (
    <MetaProvider tags={tags}>
      <AuthProvider>
        <ThemeProvider>
          <ThemeDefault>
            <Navigation />
            <Routes>
              <Route path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="*any" component={Page404} />
            </Routes>
          </ThemeDefault>
        </ThemeProvider>
      </AuthProvider>
    </MetaProvider>
  );
};

export default App;
