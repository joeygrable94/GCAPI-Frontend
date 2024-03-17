import type { CookieSerializeOptions } from 'cookie-es';

export const getClientCookie = (name: string): string | undefined => {
  'use client';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return undefined;
};

export const setClientCookie = (
  name: string,
  value: string,
  opts?: CookieSerializeOptions
): void => {
  'use client';
  let cookieValue = encodeURIComponent(value) + ';';
  if (opts?.expires) cookieValue += 'expires=' + opts!.expires + ';';
  if (opts?.path) cookieValue += 'path=' + opts!.path + ';';
  document.cookie = name + '=' + cookieValue;
};

export const parseCookieByName = <T = any>(
  cookie: string,
  name: string
): T | undefined => {
  'use client';
  const cookieObj: Record<string, string> = {};
  cookie.split(';').forEach((pair) => {
    if (pair === '') return;
    const [key, value] = pair.split('=');
    cookieObj[key.trim()] = value.trim();
  });
  try {
    return JSON.parse(cookieObj[name]) as T;
  } catch (error) {
    return undefined;
  }
};
