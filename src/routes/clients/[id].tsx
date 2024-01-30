import { useParams } from '@solidjs/router';

export default function ClientById() {
  const params = useParams();

  return (
    <>
      <p>Fetch Client by ID: {params.id}</p>
    </>
  );
}
