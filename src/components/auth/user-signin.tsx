import { Button, Form } from 'solid-bootstrap';
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
      <Form onSubmit={handleSubmit}>
        <Form.Group class="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            auto-complete="email"
            required
          />
          <Form.Text class="text-muted">Please enter your email.</Form.Text>
        </Form.Group>
        <Form.Group class="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            auto-complete="current-password"
            required
          />
        </Form.Group>
        <Form.Group class="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            name="remember"
            type="checkbox"
            label="Remember this device?"
            value="true"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <a href="/register">Don't have an account? Sign Up</a>
    </div>
  );
};

export default SignIn;
