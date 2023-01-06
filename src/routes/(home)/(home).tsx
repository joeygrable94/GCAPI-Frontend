import { Title } from 'solid-start';
import Counter from '~/lib/components/Counter';

export default function HomeMain(props: any) {
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
