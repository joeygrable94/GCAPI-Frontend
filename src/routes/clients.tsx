import type { RouteSectionProps } from '@solidjs/router';

export default function ClientsLayout(props: RouteSectionProps) {
  return (
    <div>
      <h1>Clients</h1>
      {props.children}
    </div>
  );
}
