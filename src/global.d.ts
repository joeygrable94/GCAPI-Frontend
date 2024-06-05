/// <reference types="@solidjs/start" />

// Environment mode
type ENV_MODE = 'development' | 'production';

// Vite environment variables
interface ImportMetaEnv {
  // GLOBAL
  readonly VITE_APP_ENV: string;
  readonly VITE_DEBUG: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SESSION_SECRET: string;
  // SERVER
  readonly SERVER_SESSION_SECRET: string;
}

// Vite meta environment
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
