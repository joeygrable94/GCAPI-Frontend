import { createResource, createSignal } from 'solid-js';
import { UserAdmin, UserCreate, UserRead, UserUpdate } from '~/api';
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
    loadUsers(predicate: string = ''): void {
      setUsersSource(['users', predicate]);
    },
    loadUser(user_id: string): void {
      setUsersSource(['user', user_id]);
    },
    async createUser(data: UserCreate): Promise<UserAdmin | UserRead | boolean> {
      return await agent.Auth.register(data);
    },
    async updateUser(user_id: string, data: UserUpdate): Promise<UserRead | boolean> {
      return await agent.Users.update(user_id, data);
    },
    async deleteUser(user_id: string): Promise<boolean> {
      return await agent.Users.delete(user_id);
    }
  });

  function $req(predicate: string): Promise<UserAdmin[] | UserRead[] | null[]> {
    // if (predicate.tag) return agent.Articles.byTag(predicate.tag, state.page, LIMIT);
    return agent.Users.list(state.page);
  }

  const [users] = createResource<UserAdmin[] | UserRead[] | null[]>(
    userSource,
    (args: any, { value }) => {
      if (args[0] === 'users') {
        return $req(args[1]).then((userList: UserAdmin[] | UserRead[] | null[]) => {
          return userList;
        });
      }
      const user: UserAdmin | UserRead = state.users.filter(
        (r: UserAdmin | UserRead) => r.id === args[1]
      );
      if (user) return value;
      return agent.Users.read(args[1]).then((user: UserAdmin | UserRead | boolean) => {
        if (!user) return [];
        return [user as UserRead];
      });
    },
    { initialValue: [] }
  );

  return users;
}
