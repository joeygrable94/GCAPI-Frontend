/// <reference types="vite/client" />

type ENV_MODE = 'development' | 'production';

interface ImportMetaEnv {
  // App Settings
  readonly VITE_APP_ENV: ENV_MODE;
  readonly VITE_LOCAL_STORAGE_KEY: string;
  readonly VITE_SESSION_SECRET: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_API_BASE_URL: string;
  // Auth Settings
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_AUTH0_AUDIENCE: string;
  readonly VITE_AUTH0_REDIRECT_URI: string;
  readonly VITE_AUTH0_REWRITE_REDIRECT: boolean;
  readonly VITE_AUTH0_OFFLINE_ACCESS: boolean;
  readonly VITE_AUTH0_LOGOUT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
