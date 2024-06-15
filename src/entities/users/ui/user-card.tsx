import { createQuery } from '@tanstack/solid-query';
import { Component, Show, createEffect, createSignal } from 'solid-js';
import { UserCardBase, fetchUserById } from '~/entities/users';
import { UserRead } from '~/shared/api';

type UserCardProps = {
  initialData: UserRead | undefined;
  userId?: string | null;
};

const UserCard: Component<UserCardProps> = (props) => {
  const [userId, setUserId] = createSignal(props.userId ?? null);
  const [data, setData] = createSignal<UserRead | undefined>(props.initialData);
  const query = createQuery(() => ({
    queryKey: ['userById', userId()],
    queryFn: fetchUserById,
    initialData: props.initialData
  }));
  createEffect(() => {
    if (query.data !== undefined && query.data !== null) {
      setData(query.data as UserRead);
    }
  });
  return (
    <Show when={data()} keyed>
      {(user) => <UserCardBase user={user} />}
    </Show>
  );
};

export default UserCard;
