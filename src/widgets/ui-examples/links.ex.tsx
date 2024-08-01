import { Link } from '@getcommunity/gcui/link';
import { Component } from 'solid-js';

const AlertsExample: Component = () => {
  return (
    <div id='links' class='flex flex-col gap-1 pb-24 pt-12'>
      <h2 class='text-3xl font-bold'>Links</h2>
      <p class='text-lg'>
        This section demonstrates various link styles and states.{' '}
        <Link href='#'>Links</Link> come in all sorts of flavors. Links can be{' '}
        <Link href='#'>Regular</Link>,{' '}
        <Link href='#bold' bold>
          Bold
        </Link>
        , or{' '}
        <Link href='#italic' italic>
          Italic
        </Link>
        . Links also can have different underline styles by adding an{' '}
        <Link href='#underline' underline>
          Underline
        </Link>
        ,{' '}
        <Link href='#overline' overline>
          Overline
        </Link>
        , or{' '}
        <Link href='#line-through' lineThrough>
          Line Through
        </Link>
        . You can also combine styles like{' '}
        <Link href='#bold-italic' bold italic>
          Bold Italic
        </Link>
        ,{' '}
        <Link href='#bold-underline' bold underline>
          Bold Underline
        </Link>
        , or get crazy and mix them all three{' '}
        <Link href='#bold-italic-line-through' bold italic lineThrough>
          like this
        </Link>
        &mdash;though we wouldn't recommend it.
      </p>
      <p class='mt-4 text-lg'>
        Links also come in all the same theme colors provided. For example:{' '}
        <Link href='#info' color='info'>
          Info Link (default)
        </Link>
        ,{' '}
        <Link href='#error' color='error'>
          Error Link
        </Link>
        ,{' '}
        <Link href='#warning' color='warning'>
          Warning Link
        </Link>
        ,{' '}
        <Link href='#success' color='success'>
          Success Link
        </Link>
        ,{' '}
        <Link href='#light' color='light'>
          Light Link
        </Link>
        , and a{' '}
        <Link href='#dark' color='dark'>
          Dark Link
        </Link>
        . In addition to these theme colors in their normal state each of them come with
        an additional disabled state as well:{' '}
        <Link href='#info' color='info' disabled>
          Info Link (default)
        </Link>
        ,{' '}
        <Link href='#error' color='error' disabled>
          Error Link
        </Link>
        ,{' '}
        <Link href='#warning' color='warning' disabled>
          Warning Link
        </Link>
        ,{' '}
        <Link href='#success' color='success' disabled>
          Success Link
        </Link>
        ,{' '}
        <Link href='#light' color='light' disabled>
          Light Link
        </Link>
        , and a{' '}
        <Link href='#dark' color='dark' disabled>
          Dark Link
        </Link>
        .
      </p>
    </div>
  );
};

export default AlertsExample;
