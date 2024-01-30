import { urlDecoder, urlEncoder } from '~/utils';

/**
 * @description store a value in a cookie
 *
 * @param name of the cookie
 * @param value to store in the cookie
 * @param expires until the cookie expires
 */
export const setCookie = (name: string, value: string, expires: number): void => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expires);

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
export const getCookie = (name: string): string | undefined => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return urlDecoder(cookie.substring(name.length + 1));
    }
  }
  return undefined;
};
