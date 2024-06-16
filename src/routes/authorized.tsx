import { protected$ } from '@solid-mediakit/auth';

export default protected$(
  (session$) => {
    // const res = protectedQuery(() => ({ hello: 'world' }))
    return (
      <div>
        <h1>Protected Page</h1>
        <p>Session: {JSON.stringify(session$)}</p>
        {/* <p>Response: {JSON.stringify(res.data)}</p> */}
      </div>
    );
  },
  () => <div>Not logged in</div>
);
