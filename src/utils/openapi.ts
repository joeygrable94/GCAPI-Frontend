/*
import { OpenAPI } from '~/backend';
import { once } from '~/utilities';

const APP_PROTOCOL: string =
  import.meta.env.VITE_APP_ENV === 'production' ? 'https' : 'http';

const API_HOST: string = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : 'localhost:8888';

const REQ_URL_BASE = `${APP_PROTOCOL}://localhost:3000`;
const API_URL_BASE = `${APP_PROTOCOL}://${API_HOST}`;

// set base url for OpenAPI once
once(() => {
  const tokens = JSON.parse(import.meta.env.API_ACCESS_TOKENS);
  OpenAPI.BASE = API_URL_BASE;
  OpenAPI.HEADERS = {
    'x-api-key': tokens[0],
    'Access-Control-Allow-Origin': REQ_URL_BASE
  };
})();
*/
