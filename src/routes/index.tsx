import { Title } from 'solid-start';
import { Counter } from '~/features';

export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <p>GCAPI Solid Start App</p>
      <Counter />
    </main>
  );
}
