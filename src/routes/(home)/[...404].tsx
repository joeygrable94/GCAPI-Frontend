import { Title } from 'solid-start';
import { HttpStatusCode } from 'solid-start/server';

export default function NotFound() {
  return (
    <>
      <HttpStatusCode code={404} />
      <Title>Not Found</Title>
      <main>
        <h1 style="font-size: 20vw;">404</h1>
        <h2>Page Not Found</h2>
      </main>
    </>
  );
}
