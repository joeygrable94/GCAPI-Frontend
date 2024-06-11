import { AuthMode } from '~/providers/auth';
import { OpenAPI } from '~/shared/api';
import { once } from '~/shared/utils';

/**
 * @summary OpenAPI settings
 */
export const APP_PROTOCOL: string =
  import.meta.env.VITE_APP_ENV === 'production' ? 'https' : 'http';

export const APP_HOST: string = import.meta.env.VITE_APP_BASE_URL
  ? import.meta.env.VITE_APP_BASE_URL
  : 'localhost:3333';
export const API_HOST: string = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : 'localhost:8888';

export const APP_URL_BASE = `${APP_PROTOCOL}://${APP_HOST}`;
export const API_URL_BASE = `${APP_PROTOCOL}://${API_HOST}`;

export const setOpenApiToken = (mode: AuthMode, token: string) => {
  OpenAPI.TOKEN = token;
  console.log('Set API token:', mode, OpenAPI.TOKEN?.length);
};

// set base url for OpenAPI once
once(() => {
  OpenAPI.BASE = API_URL_BASE;
  OpenAPI.HEADERS = {
    'Access-Control-Allow-Origin': '*'
  };
})();
