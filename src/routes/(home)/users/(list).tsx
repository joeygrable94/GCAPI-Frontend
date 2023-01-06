import { useParams } from 'solid-start';
import { useStore } from '~/lib/core/store';
import { log } from '~/lib/core/utils';

export default function UsersIndex() {
  const params: any = useParams();
  const [state, actions]: any = useStore();
  log('Users Index');

  return (
    <>
      <main>
        <h1>All Users</h1>
        <p>Index: list all users</p>
      </main>
    </>
  );
}
