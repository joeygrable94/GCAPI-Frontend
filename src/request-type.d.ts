// Server request event locals
declare module '@solidjs/start/server' {
  interface RequestEventLocals {
    accessToken: string | undefined;
  }
}
