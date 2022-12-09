// logger
export const log = console.log.bind(console);

// exec f(x) once
const once = <ArgumentsType extends unknown[], ReturnType>(
  fn: (...args: ArgumentsType) => ReturnType
) => {
  let called = false
  let result: ReturnType

  return function func(...args: ArgumentsType) {
    if (called) {
      return result
    }
    called = true
    result = fn(...args)
    return result
  }
}

// get global object
const getGlobal = () => {
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global
  }
  throw new Error('unable to locate global object')
}

// global
export const g = once(() => getGlobal())()

// url requests
export const encode = encodeURIComponent;

// api paths
export const API_HOST = "localhost:8888";
export const API_VERSION = "v1";
export const API_URL_BASE = `http://${API_HOST}`;
