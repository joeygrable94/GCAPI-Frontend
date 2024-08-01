import { Breadcrumbs, CrumbItem } from '@getcommunity/gcui/breadcrumb';
import { ArrowRightIcon } from '@getcommunity/gcui/icon';
import { Component } from 'solid-js';

const BreadcrumbsExample: Component = () => {
  return (
    <div id='breadcrumbs' class='flex flex-col gap-4 pb-24 pt-12'>
      <h2 class='text-3xl font-bold'>Breadcrumbs</h2>
      <p class='text-lg'>
        This section demonstrates various breadcrumb styles and states.
      </p>
      <Breadcrumbs>
        <CrumbItem label='Home' href='/' />
        <CrumbItem label='Components' href='/components' />
        <CrumbItem label='Form Inputs' href='/' />
      </Breadcrumbs>
      <p>Breadcrumbs with a custom separator</p>
      <Breadcrumbs separator={<ArrowRightIcon />}>
        <CrumbItem label='Home' href='/' />
        <CrumbItem label='Components' href='/components' />
        <CrumbItem label='Form Inputs' href='/' />
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsExample;
