import { useParams } from '@solidjs/router';
import { Component } from 'solid-js';

const ClientById: Component = () => {
  const params = useParams();

  return (
    <>
      <p>Fetch Client by ID: {params.id}</p>
    </>
  );
};

export default ClientById;
