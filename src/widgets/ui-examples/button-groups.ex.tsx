import { ButtonGroup } from '@getcommunity/gcui/button';
import { Component } from 'solid-js';

const ButtonGroupsExample: Component = () => {
  return (
    <div id="button-groups" class="flex flex-col gap-4 pb-24 pt-12">
      <h2 class="text-3xl font-bold">Button Groups</h2>
      <p class="text-lg">
        This section demonstrates button groups with various styles and states.
      </p>
      <ButtonGroup
        defaultValue={'info button b'}
        items={[
          {
            value: 'info button a',
            children: 'Info Button A',
            onClick: () => console.log('Info Button A clicked')
          },
          {
            value: 'info button b',
            children: 'Info Button B',
            onClick: () => console.log('Info Button B clicked')
          },
          {
            value: 'info button c',
            children: 'Info Button C',
            onClick: () => console.log('Info Button C clicked')
          }
        ]}
      />
      <ButtonGroup
        styleType="outline"
        defaultValue={'info button b'}
        items={[
          {
            value: 'info button a',
            children: 'Info Button A',
            onClick: () => console.log('Info Button A clicked')
          },
          {
            value: 'info button b',
            children: 'Info Button B',
            onClick: () => console.log('Info Button B clicked')
          },
          {
            value: 'info button c',
            children: 'Info Button C',
            onClick: () => console.log('Info Button C clicked')
          }
        ]}
      />
      <ButtonGroup
        color="error"
        defaultValue={'error button b'}
        items={[
          {
            value: 'error button a',
            children: 'Error Button A',
            onClick: () => console.log('Error Button A clicked')
          },
          {
            value: 'error button b',
            children: 'Error Button B',
            onClick: () => console.log('Error Button B clicked')
          },
          {
            value: 'error button c',
            children: 'Error Button C',
            onClick: () => console.log('Error Button C clicked')
          }
        ]}
      />
      <ButtonGroup
        styleType="outline"
        color="error"
        defaultValue={'error button b'}
        items={[
          {
            value: 'error button a',
            children: 'Error Button A',
            onClick: () => console.log('Error Button A clicked')
          },
          {
            value: 'error button b',
            children: 'Error Button B',
            onClick: () => console.log('Error Button B clicked')
          },
          {
            value: 'error button c',
            children: 'Error Button C',
            onClick: () => console.log('Error Button C clicked')
          }
        ]}
      />
      <ButtonGroup
        color="warning"
        defaultValue={'warning button b'}
        items={[
          {
            value: 'warning button a',
            children: 'Warning Button A',
            onClick: () => console.log('Warning Button A clicked')
          },
          {
            value: 'warning button b',
            children: 'Warning Button B',
            onClick: () => console.log('Warning Button B clicked')
          },
          {
            value: 'warning button c',
            children: 'Warning Button C',
            onClick: () => console.log('Warning Button C clicked')
          }
        ]}
      />
      <ButtonGroup
        styleType="outline"
        color="warning"
        defaultValue={'warning button b'}
        items={[
          {
            value: 'warning button a',
            children: 'Warning Button A',
            onClick: () => console.log('Warning Button A clicked')
          },
          {
            value: 'warning button b',
            children: 'Warning Button B',
            onClick: () => console.log('Warning Button B clicked')
          },
          {
            value: 'warning button c',
            children: 'Warning Button C',
            onClick: () => console.log('Warning Button C clicked')
          }
        ]}
      />
      <ButtonGroup
        color="success"
        defaultValue={'success button b'}
        items={[
          {
            value: 'success button a',
            children: 'Success Button A',
            onClick: () => console.log('Success Button A clicked')
          },
          {
            value: 'success button b',
            children: 'Success Button B',
            onClick: () => console.log('Success Button B clicked')
          },
          {
            value: 'success button c',
            children: 'Success Button C',
            onClick: () => console.log('Success Button C clicked')
          }
        ]}
      />
      <ButtonGroup
        styleType="outline"
        color="success"
        defaultValue={'success button b'}
        items={[
          {
            value: 'success button a',
            children: 'Success Button A',
            onClick: () => console.log('Success Button A clicked')
          },
          {
            value: 'success button b',
            children: 'Success Button B',
            onClick: () => console.log('Success Button B clicked')
          },
          {
            value: 'success button c',
            children: 'Success Button C',
            onClick: () => console.log('Success Button C clicked')
          }
        ]}
      />
      <ButtonGroup
        color="light"
        defaultValue={'light button b'}
        items={[
          {
            value: 'light button a',
            children: 'Light Button A',
            onClick: () => console.log('Light Button A clicked')
          },
          {
            value: 'light button b',
            children: 'Light Button B',
            onClick: () => console.log('Light Button B clicked')
          },
          {
            value: 'light button c',
            children: 'Light Button C',
            onClick: () => console.log('Light Button C clicked')
          }
        ]}
      />
      <ButtonGroup
        styleType="outline"
        color="light"
        defaultValue={'light button b'}
        items={[
          {
            value: 'light button a',
            children: 'Light Button A',
            onClick: () => console.log('Light Button A clicked')
          },
          {
            value: 'light button b',
            children: 'Light Button B',
            onClick: () => console.log('Light Button B clicked')
          },
          {
            value: 'light button c',
            children: 'Light Button C',
            onClick: () => console.log('Light Button C clicked')
          }
        ]}
      />
      <ButtonGroup
        color="dark"
        defaultValue={'dark button b'}
        items={[
          {
            value: 'dark button a',
            children: 'Dark Button A',
            onClick: () => console.log('Dark Button A clicked')
          },
          {
            value: 'dark button b',
            children: 'Dark Button B',
            onClick: () => console.log('Dark Button B clicked')
          },
          {
            value: 'dark button c',
            children: 'Dark Button C',
            onClick: () => console.log('Dark Button C clicked')
          }
        ]}
      />
      <ButtonGroup
        styleType="outline"
        color="dark"
        defaultValue={'dark button b'}
        items={[
          {
            value: 'dark button a',
            children: 'Dark Button A',
            onClick: () => console.log('Dark Button A clicked')
          },
          {
            value: 'dark button b',
            children: 'Dark Button B',
            onClick: () => console.log('Dark Button B clicked')
          },
          {
            value: 'dark button c',
            children: 'Dark Button C',
            onClick: () => console.log('Dark Button C clicked')
          }
        ]}
      />
      <ButtonGroup
        styleType="fill"
        gap="1"
        defaultValue={'info button b'}
        items={[
          {
            value: 'info button a',
            children: 'Info Button A',
            onClick: () => console.log('Info Button A clicked')
          },
          {
            value: 'info button b',
            children: 'Info Button B',
            onClick: () => console.log('Info Button A clicked')
          },
          {
            value: 'info button c',
            children: 'Info Button C',
            onClick: () => console.log('Info Button A clicked')
          }
        ]}
      />
      <ButtonGroup
        orientation="vertical"
        gap="1"
        defaultValue={'info button b'}
        items={[
          {
            value: 'info button a',
            children: 'Info Button A',
            onClick: () => console.log('Info Button A clicked')
          },
          {
            value: 'info button b',
            children: 'Info Button B',
            onClick: () => console.log('Info Button A clicked')
          },
          {
            value: 'info button c',
            children: 'Info Button C',
            onClick: () => console.log('Info Button A clicked')
          }
        ]}
      />
    </div>
  );
};

export default ButtonGroupsExample;
