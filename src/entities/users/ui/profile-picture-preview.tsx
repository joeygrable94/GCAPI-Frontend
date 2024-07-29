import { Component } from 'solid-js';
import { AvatarImage } from '~/shared/ui/avatar';

type ProfilePicturePreviewProps = {
  src: string | undefined;
};

const ProfilePicturePreview: Component<ProfilePicturePreviewProps> = (props) => {
  return <AvatarImage src={props.src} alt="Profile Picture" />;
};

export default ProfilePicturePreview;
