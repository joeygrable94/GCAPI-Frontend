import { AvatarImage } from '@getcommunity/gcui/avatar';
import { Component } from 'solid-js';

type ProfilePicturePreviewProps = {
  src: string | undefined;
};

const ProfilePicturePreview: Component<ProfilePicturePreviewProps> = (props) => {
  return <AvatarImage src={props.src} alt="Profile Picture" />;
};

export default ProfilePicturePreview;
