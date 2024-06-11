import { createQuery } from '@tanstack/solid-query';
import { Card } from 'solid-bootstrap';
import { Component, Show, createEffect, createSignal, onMount } from 'solid-js';
import { fetchUserById } from '~/entities/users';
import { AuthorizedUser } from '~/providers/auth';
import { formatDateString } from '~/shared/utils';

type UserProfileCardProps = {
  initialData: AuthorizedUser | undefined;
};

const UserProfileCard: Component<UserProfileCardProps> = (props) => {
  const [data, setData] = createSignal<AuthorizedUser | undefined>(props.initialData);
  const [userId, setUserId] = createSignal(props.initialData?.id ?? '');
  const profileQuery = createQuery(() => ({
    queryKey: ['userById', userId()],
    queryFn: fetchUserById,
    initialData: props.initialData
  }));
  onMount(() => setUserId(props.initialData?.id ?? ''));
  createEffect(() => {
    if (profileQuery.data !== undefined && profileQuery.data !== null) {
      setData(profileQuery.data as AuthorizedUser);
    }
    console.log('UserProfileCard', profileQuery.data);
  });
  return (
    <Show when={data()} keyed>
      {(user) => {
        return (
          <Card style={{ width: '20rem', margin: '1rem auto' }}>
            <Card.Img
              variant="top"
              src={user.picture ?? 'https://www.gravatar.com/avatar/?d=identicon'}
            />
            <Card.Body>
              <Card.Title>{user.username}</Card.Title>
              <Card.Text>
                <dl>
                  <dd>
                    <small>{user.id}</small>
                  </dd>
                  <dt>Email</dt>
                  <dd>{user.email}</dd>
                  <dt>Created</dt>
                  <dd>{formatDateString(new Date(data()!.created))}</dd>
                </dl>
                {/* <AuthScopesList user={props.user} /> */}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      }}
    </Show>
  );
};

export default UserProfileCard;
