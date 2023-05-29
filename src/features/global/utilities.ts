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
