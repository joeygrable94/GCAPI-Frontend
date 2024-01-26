import { createQuery } from '@tanstack/solid-query';
import { Component, ErrorBoundary, Match, Suspense, Switch } from 'solid-js';
import { UsersService } from '~/backend';
import { useAuth0 } from '~/components';

const Profile: Component = () => {
  const [authState, authAct] = useAuth0();
  const profile = createQuery(() => ({
    queryKey: ['/profile'],
    queryFn: async () => await UsersService.usersCurrentApiV1UsersMeGet()
  }));
  return (
    <main>
      <Suspense>
        <ErrorBoundary fallback={<>Query Error</>}>
          <Switch>
            <Match when={profile.isPending}>
              <p>Loading Your Profile</p>
            </Match>
            <Match when={profile.isError}>
              <p>Error Loading Your Profile: {profile.error?.message}</p>
            </Match>
            <Match when={profile.isSuccess}>
              <h1>{profile.data?.username}</h1>
              <p>{profile.data?.created_on}</p>
              <img src={authState.picture} />
            </Match>
          </Switch>
        </ErrorBoundary>
      </Suspense>
    </main>
  );
};

export default Profile;
