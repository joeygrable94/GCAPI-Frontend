import { Component } from 'solid-js';
import { AuthContext } from './types';

type LoginProps = {
  auth0: AuthContext;
};

const Login: Component<LoginProps> = (props) => {
  return (
    <div>
      <p>Sign in</p>
      <div>
        <div>
          <a onClick={() => props.auth0.authorize()} type="button">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
