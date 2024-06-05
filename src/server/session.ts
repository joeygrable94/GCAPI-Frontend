import { useSession } from 'vinxi/http';

export function getSession() {
  return useSession({
    name: 'gcapi-session',
    password:
      process.env.SERVER_SESSION_SECRET ?? 'areallylongsecretthatyoushouldreplace'
  });
}
