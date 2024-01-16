import { Button, Form } from 'solid-bootstrap';
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
      <Form onSubmit={handleSubmit}>
        <Form.Group class="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            auto-complete="first_name"
            placeholder="Jane"
            required
          />
        </Form.Group>
        <Form.Group class="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            auto-complete="last_name"
            placeholder="Smith"
            required
          />
        </Form.Group>
        <Form.Group class="mb-3" controlId="formBasicCompany">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            name="client_ref"
            placeholder="Company Name"
            required
          />
          <Form.Text class="text-muted">What company do you work with?</Form.Text>
        </Form.Group>
        <Form.Group class="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            auto-complete="email"
            required
          />
          <Form.Text class="text-muted">What is your email?</Form.Text>
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
        <Form.Group class="mb-3" controlId="formBasicPasswordConf">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="password_conf"
            type="password"
            placeholder="Confirm Password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      <a href="/login">Already have an account? Sign In</a>
    </div>
  );
};

export default SignUp;
