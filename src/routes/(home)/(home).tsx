import { Title } from 'solid-start';
import Counter from '~/lib/components/Counter';
import { log } from '~/lib/core/utils';

export default function HomeMain(props: any) {
  if (import.meta.env.DEV && !import.meta.env.SSR) log('<UserProfileMain>');
  return (
    <>
      <Title>Home Page</Title>
      <main>
        <h1>Hello there!</h1>
        <h2>Welcome to GCAPI.</h2>
        <Counter />
      </main>
    </>
  );
}
