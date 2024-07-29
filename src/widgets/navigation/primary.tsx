import { createSession, signIn, signOut } from '@solid-mediakit/auth/client';
import { A } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import { NavlinkToggleDarkMode } from '~/providers/theme';

const PrimaryNavigation: Component = () => {
  const auth = createSession();
  const links = [
    ['Users', '/users'],
    ['Clients', '/clients'],
    ['Websites', '/websites']
  ];
  const navClass =
    'rounded-full px-3 py-2 text-md text-gray-900 no-underline hover:text-inherit hover:bg-gray-300 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-50';
  return (
    <nav
      style={{ padding: 0 }}
      class="border-b-2 bg-gray-50 dark:border-gray-700 dark:bg-black"
    >
      <div class="container mx-auto flex flex-row items-center gap-1">
        <A
          href="/"
          class="inline-flex flex-row flex-nowrap items-center justify-center px-2 py-1 text-lg text-gray-900 no-underline hover:text-inherit dark:text-gray-100"
        >
          <img alt="" src={'/favicon.ico'} width="50" height="50" />
          <span class="ml-2">Get Community Inc</span>
        </A>
        <Show when={auth()} keyed>
          {links.map(([title, url]) => (
            <A href={url} class={navClass}>
              {title}
            </A>
          ))}
        </Show>
        <div style={{ 'margin-left': 'auto' }} />
        <A href={`/components`} class={navClass}>
          Components
        </A>
        <Show
          when={auth()}
          keyed
          fallback={
            <a href="#login" onClick={() => void signIn('auth0')} class={navClass}>
              Login
            </a>
          }
        >
          <A href={`/users/profile`} class={navClass}>
            Profile
          </A>
          <a
            href="#logout"
            onClick={() =>
              void signOut({
                redirectTo: '/login',
                redirect: true
              })
            }
            class={navClass}
          >
            Logout
          </a>
        </Show>
        <NavlinkToggleDarkMode class={navClass} />
      </div>
    </nav>
  );
};

export default PrimaryNavigation;
