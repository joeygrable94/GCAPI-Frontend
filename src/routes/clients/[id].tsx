import { useParams } from '@solidjs/router';
import { Component } from 'solid-js';

const ClientById: Component = () => {
  const params = useParams();
  return (
    <main>
      <h1>Client by ID {params.id}</h1>
    </main>
  );
};

export default ClientById;
