import { Anchor, Box, Button, Drawer, HStack, VStack } from '@hope-ui/core';
import { VsMenu } from 'solid-icons/vs';
import { createEffect, createSignal, onMount, Show } from 'solid-js';
import { A } from 'solid-start';
import { createServerAction$ } from 'solid-start/server';
import { useAuthorizedContext } from '~/lib/auth/context';
import { deauthenticate } from '~/lib/auth/utilities';
import { log } from '~/lib/core/utils';
import styles from './Nav.module.css';

export default function Navigation(props: any) {
  const [auth, _] = useAuthorizedContext();
  const [isOpen, setIsOpen] = createSignal(false);
  const [loggingOut, logout] = createServerAction$(
    async (f: FormData, { request }) => await deauthenticate(request)
  );

  return (
    <>
      <Button id={styles.toggleMainMenu} onClick={() => setIsOpen(true)}>
        <VsMenu size={40}></VsMenu>
        <Box display="none">Menu</Box>
      </Button>
      <Drawer isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <Drawer.Overlay />
        <Drawer.Content p={2} maxW="var(--hope-sizes-sm)">
          <HStack justify="space-between" mb={4}>
            <Drawer.Heading fontWeight="semibold">Menu</Drawer.Heading>
            <Drawer.CloseButton />
          </HStack>
          <VStack justify="flex-start" textAlign="left">
            {/* Authorized Users */}
            <Show
              when={auth.currentUser()}
              fallback={
                <>
                  {/* Login */}
                  <Anchor
                    as={A}
                    href="/login"
                    class={styles.navLink}
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Anchor>
                </>
              }
            >
              <Anchor
                as={A}
                href="/"
                class={styles.navLink}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Anchor>
              {/* Regular Users */}
              <Show
                when={auth.currentUser()?.is_superuser}
                fallback={
                  <>
                    <Anchor
                      as={A}
                      href="/"
                      class={styles.navLink}
                      onClick={() => setIsOpen(false)}
                    >
                      Link
                    </Anchor>
                  </>
                }
              >
                {/* Super Users */}
                <Anchor
                  as={A}
                  href="/users"
                  class={styles.navLink}
                  onClick={() => setIsOpen(false)}
                >
                  Users
                </Anchor>
              </Show>
            </Show>
          </VStack>
          {/* Bottom Section */}
          {/* Authorized Users */}
          <Show when={auth.currentUser()}>
            <HStack justify="space-between" mb={4}>
              {/* All Users */}
              <Anchor
                as={A}
                href="/profile"
                class={styles.navLink}
                onClick={() => setIsOpen(false)}
              >
                My Account
              </Anchor>
              {/* Logout Link */}
              <logout.Form class={styles.navLogoutForm}>
                <Button
                  type="submit"
                  variant="default"
                  px={2}
                  py={4}
                  onClick={() => setIsOpen(false)}
                >
                  Logout
                </Button>
              </logout.Form>
            </HStack>
          </Show>
        </Drawer.Content>
      </Drawer>
    </>
  );
}
