import { type RouteSectionProps } from '@solidjs/router';
import { SignUp } from '~/components/auth';

export default function Login(props: RouteSectionProps) {
  return (
    <main>
      <h1>Register Page</h1>
      <SignUp />
    </main>
  );
}
