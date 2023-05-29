import { APIEvent, json, parseCookie } from 'solid-start';
import { log } from '~/features';

export async function GET({ request, params }: APIEvent) {
  const cookie = parseCookie(request.headers.get('Cookie') ?? '');
  log('GET: Auth0 Code', cookie);
  console.log('GET: Auth0 Code', params);
  return json({});
}
