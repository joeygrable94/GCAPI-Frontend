export type Cookie = {
  'Set-Cookie': string;
};

export type SessionHeaders = {
  readonly headers: Cookie;
};

export type CookieSessionData = {
  csrf: string;
};
