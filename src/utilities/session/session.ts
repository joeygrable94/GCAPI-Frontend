import { createCookieSessionStorage } from 'solid-start';

export const CookieSession = createCookieSessionStorage({
  cookie: {
    name: 'gcapitok',
    secure: import.meta.env.VITE_APP_ENV === 'production' ? true : false,
    secrets: ['gcapi', import.meta.env.VITE_SESSION_SECRET],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
});
