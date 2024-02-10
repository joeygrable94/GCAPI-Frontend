import { urlDecoder, urlEncoder } from '~/shared/utils';

/**
 * @description store a value in a cookie
 *
 * @param name of the cookie
 * @param value to store in the cookie
 * @param daysToExpire until the cookie expires
 */
export const setClientCookie = (
  name: string,
  value: string,
  daysToExpire: number
): void => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const cookieValue =
    urlEncoder(value) + '; expires=' + expirationDate.toUTCString() + '; path=/';
  document.cookie = name + '=' + cookieValue;
};

/**
 * @description retrieve a value from a cookie by name
 *
 * @param name of the cookie to retrieve
 * @returns value of the cookie
 */
export const getClientCookie = (name: string): string => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return urlDecoder(cookie.substring(name.length + 1));
    }
  }
  return '';
};

/**
 * @summary parse the cookie string and return an object
 *
 * @param name of the cookie
 */
export const parseCookieByName = <T = any>(
  cookie: string,
  name: string
): T | undefined => {
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
