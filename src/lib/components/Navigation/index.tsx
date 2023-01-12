import { Anchor, Button, Drawer, HStack, VStack } from '@hope-ui/core';
import { createSignal, Show } from 'solid-js';
import { A } from 'solid-start';
import { createServerAction$ } from 'solid-start/server';
import { deauthenticate } from '~/lib/auth/utilities';
import styles from './Nav.module.css';

export default function Navigation(props: any) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [loggingOut, logout] = createServerAction$(
    async (f: FormData, { request }) => await deauthenticate(request)
  );

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Menu</Button>
      <Drawer isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <Drawer.Overlay />
        <Drawer.Content p={2}>
          <HStack justifyContent="space-between" mb={4}>
            <Drawer.Heading fontWeight="semibold">Menu</Drawer.Heading>
            <Drawer.CloseButton />
          </HStack>
          <VStack justifyContent="flex-start" textAlign="left">
            <Anchor
              as={A}
              href="/"
              class={styles.navLink}
              onClick={() => setIsOpen(false)}
            >
              Index
            </Anchor>
            {/* Login */}
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
              {/* All Users */}
              <Anchor
                as={A}
                href="/profile"
                class={styles.navLink}
                onClick={() => setIsOpen(false)}
              >
                My Account
              </Anchor>
              {/* Regular Users */}
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
              {/* Logout Link */}
              <logout.Form class={styles.navLogoutForm}>
                <Button
                  type="submit"
                  variant="default"
                  class={styles.navLogoutFormBtn}
                  onClick={() => setIsOpen(false)}
                >
                  Logout
                </Button>
              </logout.Form>
            </Show>
          </VStack>
        </Drawer.Content>
      </Drawer>
    </>
  );
}
