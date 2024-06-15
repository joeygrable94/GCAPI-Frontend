import { createQuery } from '@tanstack/solid-query';
import { Component, Show, createEffect, createSignal } from 'solid-js';
import { UserCardBase, fetchCurrentUser } from '~/entities/users';
import { AuthorizedUser } from '~/providers/auth';

type ProfileCardProps = {
  initialData: AuthorizedUser | undefined;
};

const ProfileCard: Component<ProfileCardProps> = (props) => {
  const [data, setData] = createSignal<AuthorizedUser | undefined>(props.initialData);
  const query = createQuery(() => ({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    initialData: props.initialData
  }));
  createEffect(() => {
    if (query.data !== undefined && query.data !== null) {
      setData(query.data as AuthorizedUser);
    }
  });
  return (
    <Show when={data()} keyed>
      {(user) => <UserCardBase user={user} />}
    </Show>
  );
};

export default ProfileCard;
