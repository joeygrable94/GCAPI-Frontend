import { Image } from 'solid-bootstrap';
import { Component } from 'solid-js';

type ProfilePicturePreviewProps = {
  src: string | null | undefined;
};

const ProfilePicturePreview: Component<ProfilePicturePreviewProps> = (props) => {
  return (
    <div
      class="image-container-square"
      style={{ width: '60px', 'padding-bottom': '60px', margin: 'auto' }}
    >
      <Image
        class="image-square"
        src={props.src ?? 'https://www.gravatar.com/avatar/?d=identicon'}
        roundedCircle
      />
    </div>
  );
};

export default ProfilePicturePreview;
