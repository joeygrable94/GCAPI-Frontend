import { Title } from '@solidjs/meta';
import { Component } from 'solid-js';

const NotFound: Component = () => {
  return (
    <>
      <Title>Not Found</Title>
      <main style={{ 'text-align': 'center' }}>
        <h1
          style={{
            'font-size': '33vw'
          }}
        >
          404
        </h1>
        <h2
          style={{
            'font-size': '6vw'
          }}
        >
          Page Not Found
        </h2>
      </main>
    </>
  );
};

export default NotFound;
