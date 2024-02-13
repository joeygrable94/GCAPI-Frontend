import type { CookieSerializeOptions } from 'cookie-es';
import { deleteCookie, getCookie, setCookie } from 'vinxi/http';

export const getServerCookie = (name: string): string | undefined => {
  'use server';
  return getCookie(name);
};

export const setServerCookie = (
  name: string,
  value: string,
  opts?: CookieSerializeOptions
): void => {
  'use server';
  setCookie(name, value, opts);
};

export const deleteServerCookie = (
  name: string,
  serializeOptions?: CookieSerializeOptions
): void => {
  'use server';
  deleteCookie(name, serializeOptions);
};
