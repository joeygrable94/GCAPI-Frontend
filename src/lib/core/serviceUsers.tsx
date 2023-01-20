import { createResource, createSignal } from 'solid-js';
import { UserCreate, UserRead, UserReadSafe, UserUpdate } from '~/api';
import { IAppAgent } from './types';

export default function createUsersService(
  agent: IAppAgent,
  actions: any,
  state: any,
  setState: any
) {
  const [userSource, setUsersSource] = createSignal(['users', '']);

  Object.assign(actions, {
    setPage: (page: number): void =>
      page <= 0 ? setState('page', 1) : setState('page', page),
    loadUsers(predicate: string): void {
      setUsersSource(['users', predicate]);
    },
    loadUser(user_id: string): void {
      setUsersSource(['user', user_id]);
    },
    mapUsers(users: UserRead[] | null[]): Map<string, UserRead> {
      let usersMap = new Map<string, UserRead>();
      if (users.length != 0) {
        for (let user of users) if (user) usersMap.set(user.id, user);
      }
      return usersMap;
    },
    listUsers(user_map: Map<string, UserRead>): UserRead[] {
      let usersList: UserRead[] = [];
      let keys: IterableIterator<string> = user_map.keys();
      for (let k of keys) {
        if (user_map.get(k)) usersList.push(user_map.get(k) as UserRead);
      }
      return usersList;
    },
    async createUser(data: UserCreate): Promise<UserReadSafe | boolean> {
      return await agent.Auth.register(data);
    },
    async updateUser(user_id: string, data: UserUpdate): Promise<UserRead | boolean> {
      return await agent.Users.update(user_id, data);
    },
    async deleteUser(user_id: string): Promise<boolean> {
      return await agent.Users.delete(user_id);
    }
  });

  function $req(predicate: string): Promise<UserRead[] | null[]> {
    // if (predicate.tag) return agent.Articles.byTag(predicate.tag, state.page, LIMIT);
    return agent.Users.list(state.page);
  }

  const [users] = createResource(
    userSource,
    (args: any[], { value }) => {
      if (args[0] === 'users') {
        return $req(args[1]).then((users) => {
          // queueMicrotask(() =>
          //   setState({ totalPagesCount: Math.ceil(articlesCount / LIMIT) })
          // );
          return actions.mapUsers(users);
        });
      }
      // const user = state.users.filter((r: UserRead) => r.id === args[1]);
      const user = state.users[args[1]];
      if (user) return value;
      return agent.Users.read(args[1]).then((user: UserRead | boolean) => {
        if (!user) return {};
        return [user as UserRead];
      });
    },
    { initialValue: {} }
  );

  return users;
}
