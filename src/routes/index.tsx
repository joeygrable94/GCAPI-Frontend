import { useAuth } from '~/components';

export default function Home() {
  const [state, actions] = useAuth();
  return (
    <main>
      <h2>Hello World</h2>
      <h3>Message board</h3>
      <button name="logout" type="submit" onClick={() => actions.logout()}>
        Logout Action
      </button>
    </main>
  );
}
