import { isServer } from 'solid-js/web';
import { once } from '~/shared/utils';

/**
 * @summary URL Search Params
 */
export const searchParams = once(() => {
  if (!isServer && typeof window !== 'undefined') {
    return new Proxy(new URLSearchParams(window.location.search), {
      get: (s: URLSearchParams, p: string) => s.get(p)
    });
  }
});

/**
 * @summary URL Encoder
 */
export const urlEncoder = encodeURIComponent;

/**
 * @summary URL Encoder
 */
export const urlDecoder = decodeURIComponent;
