export default function ProfileInfo({ user }: any) {
  return (
    <p>
      {user.id}
      <br />
      {user.email}
      <br />
      {user.is_active ? 'active' : 'inactive'}
      <br />
      {user.is_verified ? 'verified' : 'unverified'}
      <br />
      {user.is_superuser ? 'superuser' : 'user'}
      <br />
      {user.created_on}
      <br />
      {user.updated_on}
    </p>
  );
}
