import { protected$ } from '@solid-mediakit/auth';

export default protected$(
  (session$) => {
    return (
      <div>
        <h1>Protected Page</h1>
        <p>Session: {JSON.stringify(session$)}</p>
      </div>
    );
  },
  () => <div>Not logged in</div>
);
