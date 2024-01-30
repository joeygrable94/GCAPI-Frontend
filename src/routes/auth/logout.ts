import { APIEvent } from '@solidjs/start/server/types.js';
import { getLogoutRequest } from '~/components';

export async function GET(event: APIEvent) {
  return await getLogoutRequest(event);
}
