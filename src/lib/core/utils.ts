import { OpenAPI } from '~/api';

// logger
export const log = console.log.bind(console);

// exec f(x) once
const once = <ArgumentsType extends unknown[], ReturnType>(
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

// get global object
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

// global
export const g = once(() => getGlobal())();

// url requests
export const encode = encodeURIComponent;

// OpenAPI settings
export const API_PROTOCOL: string =
  import.meta.env.VITE_TLS_ACTIVE === 'true' ? 'https' : 'http';
export const API_HOST: string = import.meta.env.DEV
  ? import.meta.env.VITE_API_BASE_URL_DEV
  : import.meta.env.VITE_API_BASE_URL_LIVE;
export const API_URL_BASE = `${API_PROTOCOL}://${API_HOST}`;

// set OpenAPI Base URL
OpenAPI.BASE = API_URL_BASE
