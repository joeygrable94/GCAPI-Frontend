import { useParams } from '@solidjs/router';
import { Component } from 'solid-js';

const UserById: Component = () => {
  const params = useParams();
  return (
    <main>
      <h1>User by ID {params.id}</h1>
    </main>
  );
};

export default UserById;
