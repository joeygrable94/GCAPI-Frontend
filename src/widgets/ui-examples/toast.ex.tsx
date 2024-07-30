import { Button } from '@getcommunity/gcui/button';
import { toast } from '@getcommunity/gcui/toast';
import { Component } from 'solid-js';

const ToastExample: Component = () => {
  return (
    <div id="btns" class="flex flex-col gap-4 pb-24 pt-12">
      <h2 class="text-3xl font-bold">Toast</h2>
      <p class="text-lg">
        This section demonstrates various toast message styles and states.
      </p>
      <div class="flex flex-row items-center justify-start gap-2">
        <Button
          styleType="fill"
          color="light"
          tabIndex={0}
          onClick={() =>
            toast.show('Default Toast', 'This is a default toast message.')
          }
        >
          Default Toast
        </Button>
        <Button
          styleType="fill"
          color="info"
          tabIndex={0}
          onClick={() =>
            toast.info('Info Toast', 'This is an info themed toast message.')
          }
        >
          Info Toast
        </Button>
        <Button
          styleType="fill"
          color="error"
          tabIndex={0}
          onClick={() =>
            toast.error('Error Toast', 'This is an error themed toast message.')
          }
        >
          Error Toast
        </Button>
        <Button
          styleType="fill"
          color="warning"
          tabIndex={0}
          onClick={() =>
            toast.warning('Warning Toast', 'This is a warning themed toast message.')
          }
        >
          Warning Toast
        </Button>
        <Button
          styleType="fill"
          color="success"
          tabIndex={0}
          onClick={() =>
            toast.success('Success Toast', 'This is a success themed toast message.')
          }
        >
          Success Toast
        </Button>
        <Button
          styleType="fill"
          color="light"
          tabIndex={0}
          onClick={() =>
            toast.show('Light Toast', 'This is a light themed toast message.', {
              color: 'light'
            })
          }
        >
          Light Toast
        </Button>
        <Button
          styleType="fill"
          color="dark"
          tabIndex={0}
          onClick={() =>
            toast.show('Dark Toast', 'This is a dark themed toast message.', {
              color: 'dark'
            })
          }
        >
          Dark Toast
        </Button>
      </div>
    </div>
  );
};

export default ToastExample;
