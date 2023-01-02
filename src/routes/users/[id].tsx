import { useParams } from "solid-start";

export default function UserById() {
  const params = useParams();
  return <div>User {params.id}</div>;
}
