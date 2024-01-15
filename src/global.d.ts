/// <reference types="@solidjs/start/env" />

type ENV_MODE = 'development' | 'production';

interface ImportMetaEnv {
  // Settings
  readonly APP_ENV: string;
  readonly DEBUG: string;
  readonly LOCAL_STORAGE_KEY: string;
  readonly SESSION_SECRET: string;
  readonly APP_BASE_URL: string;
  readonly API_BASE_URL: string;
  // Auth0
  readonly AUTH0_DOMAIN: string;
  readonly AUTH0_AUDIENCE: string;
  readonly AUTH0_CLIENT_ID: string;
  readonly AUTH0_CLIENT_SECRET: string;
  readonly AUTH0_CALLBACK_URL: string;
  readonly AUTH0_LOGOUT_URL: string;
  readonly AUTH0_SCOPE: string;
  readonly AUTH0_OFFLINE_ACCESS: string;
  readonly AUTH0_PERMISSIONS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
