import { SessionData, useSession } from 'vinxi/http';
import { OpenAPI } from '~/shared/api';

export interface AppSession extends SessionData {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}

export function getSession() {
  return useSession<AppSession>({
    name: 'gcapi_session',
    password:
      process.env.SERVER_SESSION_SECRET ?? 'areallylongsecretthatyoushouldreplace'
  });
}

export async function clearSession() {
  const session = await getSession();
  await session.clear();
}

export async function setOpenAPISessionToken() {
  const session = await getSession();
  OpenAPI.TOKEN = session.data.accessToken;
}
