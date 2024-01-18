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
