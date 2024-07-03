import { createSession } from '@solid-mediakit/auth/client';
import { RouteSectionProps } from '@solidjs/router';
import { Show, Suspense } from 'solid-js';
import { Separator } from '~/shared/ui/separator';

export default function ComponentsLayout(props: RouteSectionProps) {
  const auth = createSession();

  return (
    <main class="flex flex-col gap-6">
      <div class="mt-8">
        <h1 class="text-5xl">Components</h1>
        <p>
          The following page shows the available UI components built for GC web UIs.
        </p>
      </div>
      <div class="my-4 flex h-7 w-auto flex-row flex-wrap gap-8">
        <a href="/components">UI Components</a>
        <Separator orientation="vertical" />
        <a href="/components/alerts">Alerts</a>
        <a href="/components/avatar">Avatar</a>
        <a href="/components/breadcrumbs">Breadcrumbs</a>
        <a href="/components/buttons">Buttons</a>
        <a href="/components/button-groups">Button Groups</a>
        <a href="/components/separators">Separators</a>
        <a href="/components/form-inputs">Form Inputs</a>
        <a href="/components/links">Links</a>
        <a href="/components/pagination">Pagination</a>
        <a href="/components/tabs">Tabs</a>
      </div>
      <Show when={auth()} fallback={<p>You are not signed in.</p>}>
        <Suspense>{props.children}</Suspense>
      </Show>
    </main>
  );
}
