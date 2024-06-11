import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { ssrFetchUserById } from '~/entities/users';

const UserProfileCard = clientOnly(() => import('~/entities/users/ui/profile-card'));

export const route = {
  async load({ params }) {
    const user = await ssrFetchUserById(params.id);
    return { user };
  }
} satisfies RouteDefinition;

export default function UserById(props: RouteSectionProps) {
  const userId = () => props.params.id;
  const data = createAsync(() => ssrFetchUserById(userId()));
  return (
    <main>
      <UserProfileCard initialData={data()} />
    </main>
  );
}
