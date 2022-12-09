import { Title } from "solid-start";
import Counter from "~/components/Counter";

export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Welcome Home</h1>
      <p>SolidJS</p>
      <Counter />
    </main>
  );
}
