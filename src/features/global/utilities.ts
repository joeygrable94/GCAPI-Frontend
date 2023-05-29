import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { isServer } from 'solid-js/web';
import { OpenAPI } from '~/api';

/**
 * @summary utilities log to the console
 */
export const log = console.log.bind(console);
export const warn = console.warn.bind(console);
export const info = console.info.bind(console);
export const error = console.error.bind(console);

/**
 * @summary executes a provided function only once
 */
export const once = <ArgumentsType extends unknown[], ReturnType>(
  fn: (...args: ArgumentsType) => ReturnType
) => {
  let called = false;
  let result: ReturnType;

  return function func(...args: ArgumentsType) {
    if (called) {
      return result;
    }
    called = true;
    result = fn(...args);
    return result;
  };
};

/**
 * @summary attempts to located the global object
 */
const getGlobal = () => {
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
};

/**
 * @summary global object
 */
export const GLOBAL = once(() => getGlobal())();

/**
 * @summary simple glob regex match test
 */
export const globMatch = function (pattern: string, input: string): boolean {
  var re = new RegExp(
    pattern.replace(/([.?+^$[\]\\(){}|\/-])/g, '\\$1').replace(/\*/g, '.*')
  );
  return re.test(input);
};

/**
 * @summary URL Encoder
 */
export const searchParams = once(() => {
  if (!isServer) {
    return new Proxy(new URLSearchParams(window.location.search), {
      get: (s: URLSearchParams, p: string) => s.get(p)
    });
  }
});
export const encode = encodeURIComponent;

/**
 * @summary OpenAPI settings
 */
const APP_PROTOCOL: string =
  import.meta.env.VITE_APP_ENV === 'production' ? 'https' : 'http';
const API_HOST: string = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : 'localhost:8888';
const API_URL_BASE = `${APP_PROTOCOL}://${API_HOST}`;
// set base url for OpenAPI once
once(() => {
  OpenAPI.BASE = API_URL_BASE;
})();

/**
 * @description create a solidjs store that is persisted to localStorage
 *
 * @param value to store
 * @param appKey to store the value under
 * @returns a solidjs getter and setter
 */
export function createLocalStore<T extends object>(value: T, appKey: string) {
  const stored = localStorage.getItem(appKey);
  const [state, setState] = createStore<T>(stored ? JSON.parse(stored) : value);

  createEffect(() => localStorage.setItem(appKey, JSON.stringify(state)));
  return [state, setState] as const;
}

/**
 * @description store a value in a cookie
 *
 * @param name of the cookie
 * @param value to store in the cookie
 * @param daysToExpire until the cookie expires
 */
export const setCookie = (name: string, value: string, daysToExpire: number): void => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const cookieValue =
    encodeURIComponent(value) +
    '; expires=' +
    expirationDate.toUTCString() +
    '; path=/';
  document.cookie = name + '=' + cookieValue;
};

/**
 * @description retrieve a value from a cookie by name
 *
 * @param name of the cookie to retrieve
 * @returns value of the cookie
 */
export const getCookie = (name: string): string => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return '';
};
