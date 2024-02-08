import { Card } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { AuthorizedUser } from '~/providers/auth';
import { formatDateString } from '~/shared/utils';

type UserProfileCardProps = {
  user: AuthorizedUser;
};

const UserProfileCard: Component<UserProfileCardProps> = (props) => {
  return (
    <Card style={{ width: '20rem', margin: '1rem auto' }}>
      <Card.Img
        variant="top"
        src={props.user.picture ?? 'https://www.gravatar.com/avatar/?d=identicon'}
      />
      <Card.Body>
        <Card.Title>{props.user.username}</Card.Title>
        <Card.Text>
          <dl>
            <dd>
              <small>{props.user.id}</small>
            </dd>
            <dt>Email</dt>
            <dd>{props.user.email}</dd>
            <dt>Created</dt>
            <dd>{formatDateString(new Date(props.user.created_on))}</dd>
          </dl>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserProfileCard;