import {
  createHandler,
  renderAsync,
  StartServer
} from 'solid-start/entry-server';
import { log } from '~/lib/core/utils';
import { getUser } from '~/lib/db/session';

// const protectedPaths = ['/users'];

export default createHandler(
  ({ forward }: any) => {
    return async (event) => {
      // if (protectedPaths.includes(new URL(event.request.url).pathname)) {}
      try {
        const user = await getUser(event.request);
        if (import.meta.env.DEV) log('middleware user:', user);
      } catch (err: any) {
        // log(err);
      }
      return forward(event);
    };
  },
  renderAsync((event) => <StartServer event={event} />)
);
