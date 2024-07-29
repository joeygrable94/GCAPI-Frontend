import { Image } from '@kobalte/core/image';
import { Component } from 'solid-js';
import { UserRead } from '~/shared/api';
import { formatDateString } from '~/shared/utils';

type UserCardBaseProps = {
  user: UserRead;
};

const UserCardBase: Component<UserCardBaseProps> = (props) => {
  return (
    <div class="mx-auto my-4 grid max-w-md place-items-center overflow-hidden rounded-md shadow-sm">
      <Image>
        <Image.Img
          class="mx-auto aspect-video object-cover"
          src={props.user.picture ?? 'https://www.gravatar.com/avatar/?d=identicon'}
          alt="Profile Picture"
        />
        <Image.Fallback class="image__fallback">User</Image.Fallback>
      </Image>
      <div>
        <h2>{props.user.username}</h2>
        <div>
          <dl>
            <dd>
              <small>{props.user.id}</small>
            </dd>
            <dt>Email</dt>
            <dd>{props.user.email}</dd>
            <dt>Created</dt>
            <dd>{formatDateString(new Date(props.user.created))}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default UserCardBase;
