import { APIEvent } from 'solid-start';

export async function GET({ request }: APIEvent) {
  console.log('GET: AUTH LOGOUT REQUEST', request);
  return request;
}
