import { Component } from "solid-js"
import { UserLoginForm } from "~/forms/login";

const AuthLogin: Component = () => {
  return (
    <main class="container">
      <h1>Login</h1>
      <UserLoginForm />
    </main>
  );
}

export default AuthLogin
