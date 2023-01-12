import { Title } from 'solid-start';
import { HttpStatusCode } from 'solid-start/server';
import { log } from '~/lib/core/utils';

export default function NotFound() {
  if (import.meta.env.DEV && !import.meta.env.SSR) log('<NotFound>');
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
