import '@auth/core/types';

declare module '@auth/core/types' {
  export interface Session extends DefaultSession {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  }
}
