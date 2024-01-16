import { Component, JSX } from 'solid-js';
import { useAuth } from './context';
import { AuthLogin } from './types';

const SignIn: Component = () => {
  const [, authActions] = useAuth();
  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    authActions.login({
      email: data.get('email'),
      password: data.get('password'),
      remember: data.get('remember')
    } as AuthLogin);
  };

  return (
    <div>
      <h3>Sign in</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" id="email" name="email" auto-complete="email" required />
        <input
          type="password"
          id="password"
          name="password"
          auto-complete="current-password"
          required
        />
        <input type="checkbox" name="remember" value="true" />
        <input type="hidden" name="redirect" value="/" />
        <button type="submit">Sign In</button>
        <a href="/register">Don't have an account? Sign Up</a>
      </form>
    </div>
  );
};

export default SignIn;
