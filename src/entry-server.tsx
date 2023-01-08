import {
  createHandler,
  renderAsync,
  StartServer
} from 'solid-start/entry-server';
import { Authorized, getUser } from '~/lib/auth/session';
import { log } from '~/lib/core/utils';

export default createHandler(
  ({ forward }: any) => {
    return async (event) => {
      let authorized: Authorized | null = await getUser(event.request);
      // const url: string = new URL(event.request.url).pathname;
      if (import.meta.env.DEV) log('authorized user', authorized?.user.email);
      return forward(event);
    };
  },
  renderAsync((event) => <StartServer event={event} />)
);
