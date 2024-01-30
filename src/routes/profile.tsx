import { RouteDefinition, createAsync } from '@solidjs/router';
import { Component } from 'solid-js';
import { CurrentUser, getCurrentUser } from '~/components';
import { formatDateString } from '~/utils';

export const route = {
  load: () => getCurrentUser()
} satisfies RouteDefinition;

const Profile: Component = () => {
  const data = createAsync<CurrentUser | undefined>(getCurrentUser);
  return (
    <main>
      <h1>{data() && data()!.email}</h1>
      <p>Created: {data() && formatDateString(new Date(data()!.created_on))}</p>
    </main>
  );
};

export default Profile;
