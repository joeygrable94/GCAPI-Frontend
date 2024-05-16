import { OpenAPI } from '~/shared/api';
import { once } from '~/shared/utils';

/**
 * @summary OpenAPI settings
 */
const APP_PROTOCOL: string =
  import.meta.env.VITE_APP_ENV === 'production' ? 'https' : 'http';

const API_HOST: string = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : 'localhost:3333';

const API_URL_BASE = `${APP_PROTOCOL}://${API_HOST}`;

// set base url for OpenAPI once
once(() => (OpenAPI.BASE = API_URL_BASE))();
