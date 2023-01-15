import { createCookieSessionStorage } from 'solid-start';

const sessionSecret = import.meta.env.VITE_SESSION_SECRET;

export const authorizedCookieStorage = createCookieSessionStorage({
  cookie: {
    name: 'gcapitok',
    // secure doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: true,
    secrets: ['gcapi', sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
});
