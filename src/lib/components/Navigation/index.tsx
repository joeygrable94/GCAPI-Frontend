import { Anchor, Box, Button, Drawer, HStack, VStack } from '@hope-ui/core';
import { VsMenu } from 'solid-icons/vs';
import { createSignal, Show } from 'solid-js';
import { A } from 'solid-start';
import { createServerAction$ } from 'solid-start/server';
import { useAuthorizedContext } from '~/lib/auth';
import { deauthenticate } from '~/lib/auth/utilities';
import styles from './Nav.module.scss';

export default function Navigation(props: any) {
  const [auth, actions] = useAuthorizedContext();
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
            <Show
              when={props?.user}
              fallback={
                <>
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
              <Show
                when={props?.user?.is_superuser}
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
          <Show when={props?.user}>
            <HStack justify="space-between" mb={4}>
              <Anchor
                as={A}
                href="/profile"
                class={styles.navLink}
                onClick={() => setIsOpen(false)}
              >
                My Account
              </Anchor>
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
