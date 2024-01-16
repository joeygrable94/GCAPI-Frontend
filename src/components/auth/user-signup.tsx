import { Component, JSX } from 'solid-js';
import { useAuth } from './context';
import { AuthRegister } from './types';
// import { AuthRegister } from './types';

const SignUp: Component = () => {
  const [, authActions] = useAuth();
  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    authActions.register({
      first_name: data.get('first_name') ?? '',
      last_name: data.get('last_name') ?? '',
      client_ref: data.get('client_ref') ?? '',
      email: data.get('email') ?? '',
      password: data.get('password') ?? '',
      password_conf: data.get('password_conf') ?? ''
    } as AuthRegister);
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="first_name"
          name="first_name"
          auto-complete="first_name"
          placeholder="Jane"
          required
        />
        <input
          type="text"
          id="last_name"
          name="last_name"
          auto-complete="last_name"
          placeholder="Smith"
          required
        />
        <input
          type="text"
          id="client_ref"
          name="client_ref"
          placeholder="Company Name"
          required
        />
        <input
          type="text"
          id="email"
          name="email"
          auto-complete="email"
          placeholder="jane.smith@email.com"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          auto-complete="current-password"
          required
        />
        <input type="password" id="password_conf" name="password_conf" required />
        <button type="submit">Sign Up</button>
        <a href="/login">Have an account? Sign In</a>
      </form>
    </div>
  );
};

export default SignUp;
