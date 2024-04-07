/// <reference types="@solidjs/start/env" />

type ENV_MODE = 'development' | 'production';

interface ImportMetaEnv {
  // GLOBAL
  readonly VITE_APP_ENV: string;
  readonly VITE_DEBUG: string;
  readonly VITE_LOCAL_STORAGE_KEY: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SESSION_SECRET: string;
  // CLIENT - Auth0
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_AUTH0_AUDIENCE: string;
  readonly VITE_AUTH0_ORGANIZATION: string;
  readonly VITE_AUTH0_ORGANIZATION_ID: string;
  readonly VITE_AUTH0_REDIRECT_URI: string;
  readonly VITE_AUTH0_LOGOUT_URL: string;
  readonly VITE_AUTH0_OFFLINE_ACCESS: string;
  // SERVER
  readonly SERVER_SESSION_SECRET: string;
  // SERVER - Auth0
  readonly AUTH0_CLIENT_SECRET: string;
  readonly AUTH0_SCOPE: string;
  readonly AUTH0_PERMISSIONS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
