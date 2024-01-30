'use server';
import { APIEvent } from '@solidjs/start/server';
import { getLoginRequest } from '~/components';

export async function GET(event: APIEvent) {
  return await getLoginRequest(event);
}
