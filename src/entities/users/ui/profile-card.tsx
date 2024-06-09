import { createQuery } from '@tanstack/solid-query';
import { Card } from 'solid-bootstrap';
import { Component, Show } from 'solid-js';
import { fetchUserById } from '~/entities/users';
import { AuthorizedUser } from '~/providers/auth';
import { formatDateString } from '~/shared/utils';

type UserProfileCardProps = {
  user: AuthorizedUser;
};

const UserProfileCard: Component<UserProfileCardProps> = (props) => {
  const query = createQuery(() => ({
    queryKey: ['userProfile', props.user.id],
    queryFn: fetchUserById,
    initialData: props.user
  }));
  return (
    <Show when={query.isSuccess}>
      <Card style={{ width: '20rem', margin: '1rem auto' }}>
        <Card.Img
          variant="top"
          src={query.data?.picture ?? 'https://www.gravatar.com/avatar/?d=identicon'}
        />
        <Card.Body>
          <Card.Title>{query.data?.username}</Card.Title>
          <Card.Text>
            <dl>
              <dd>
                <small>{query.data?.id}</small>
              </dd>
              <dt>Email</dt>
              <dd>{query.data?.email}</dd>
              <dt>Created</dt>
              <dd>{formatDateString(new Date(query.data!.created))}</dd>
            </dl>
            {/* <AuthScopesList user={props.user} /> */}
          </Card.Text>
        </Card.Body>
      </Card>
    </Show>
  );
};

export default UserProfileCard;
