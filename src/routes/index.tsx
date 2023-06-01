import { onMount } from 'solid-js';
import { Title } from 'solid-start';
import { Counter } from '~/features';

export default function Home() {
  onMount(() => {
    console.log('home');
  });
  return (
    <main>
      <Title>GCAPI Solid Start</Title>
      <h1>SolidStart Auth Example</h1>
      <p>GCAPI Solid Start App</p>
      <Counter />
    </main>
  );
}
