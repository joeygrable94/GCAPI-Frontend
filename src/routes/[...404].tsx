import { Title } from "solid-start";
import { HttpStatusCode } from "solid-start/server";
import Navigation from "~/components/Navigation";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main>
        <Title>Not Found</Title>
        <HttpStatusCode code={404} />
        <h1>Page Not Found</h1>
      </main>
    </>
  );
}
