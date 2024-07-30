import { Breadcrumbs } from '@getcommunity/gcui/breadcrumb';
import { ArrowRightIcon } from '@getcommunity/gcui/icon';
import { Component } from 'solid-js';

const BreadcrumbsExample: Component = () => {
  return (
    <div id="breadcrumbs" class="flex flex-col gap-4 pb-24 pt-12">
      <h2 class="text-3xl font-bold">Breadcrumbs</h2>
      <p class="text-lg">
        This section demonstrates various breadcrumb styles and states.
      </p>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Form Inputs' }
        ]}
      />
      <p>Breadcrumbs with a custom separator</p>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Form Inputs' }
        ]}
        separator={<ArrowRightIcon />}
      />
    </div>
  );
};

export default BreadcrumbsExample;
