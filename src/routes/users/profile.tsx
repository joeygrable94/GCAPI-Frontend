import { RouteDefinition, createAsync } from '@solidjs/router';
import { Col, Container, Image, Row } from 'solid-bootstrap';
import { Component, Show, createEffect, createSignal } from 'solid-js';
import { AuthorizedUser, getCurrentUser, isGuest, useUser } from '~/components';
import { formatDateString, log } from '~/utils';

export const route = {
  load: () => getCurrentUser()
} satisfies RouteDefinition;

const Profile: Component = () => {
  const data = createAsync<AuthorizedUser>(getCurrentUser);
  const [userState, userAct] = useUser();
  const [user, setUser] = createSignal<AuthorizedUser | undefined>(data());
  createEffect(() => log(user()));
  createEffect(() => {
    if (!isGuest(userState.user)) {
      setUser(userState.user as AuthorizedUser);
    }
  });
  return (
    <main>
      <Container>
        <Row>
          <Col xs={4} md={3}>
            <Show when={data() !== undefined}>
              <div class="image-container-square">
                <Image
                  class="image-square"
                  src={
                    user()?.picture ?? 'https://www.gravatar.com/avatar/?d=identicon'
                  }
                  roundedCircle
                  style={{ 'object-fit': 'cover', width: '100%', height: '100%' }}
                />
              </div>
            </Show>
          </Col>
          <Col xs={8} md={9}>
            <Show when={user() !== undefined}>
              <h1>{user()?.username}</h1>
              <p>Email: {user()?.username}</p>
              <p>Created: {formatDateString(new Date(user()!.created_on))}</p>
            </Show>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Profile;
