import { Button } from '@getcommunity/gcui/button';
import { Separator } from '@getcommunity/gcui/separator';
import { Component } from 'solid-js';

const ButtonsExample: Component = () => {
  return (
    <div id="buttons" class="flex flex-col gap-4 pb-24 pt-12">
      <h2 class="text-3xl font-bold">Buttons</h2>
      <p class="text-lg">This section demonstrates various button styles and states.</p>
      <p class="text">Button Fill</p>
      <div class="flex flex-row items-center justify-start gap-2">
        <Button
          styleType="fill"
          color="info"
          onClick={() => console.log('Info Button clicked')}
          tabIndex={0}
        >
          Info Button
        </Button>
        <Button
          styleType="fill"
          color="error"
          onClick={() => console.log('Error Button clicked')}
          tabIndex={0}
        >
          Error Button
        </Button>
        <Button
          styleType="fill"
          color="warning"
          onClick={() => console.log('Warning Button clicked')}
          tabIndex={0}
        >
          Warning Button
        </Button>
        <Button
          styleType="fill"
          color="success"
          onClick={() => console.log('Success Button clicked')}
          tabIndex={0}
        >
          Success Button
        </Button>
        <Button
          styleType="fill"
          color="light"
          onClick={() => console.log('Light Button clicked')}
          tabIndex={0}
        >
          Light Button
        </Button>
        <Button
          styleType="fill"
          color="dark"
          onClick={() => console.log('Dark Button clicked')}
          tabIndex={0}
        >
          Dark Button
        </Button>
      </div>
      <div class="flex flex-row items-center justify-start gap-2">
        <Button
          styleType="fill"
          color="info"
          onClick={() => console.log('Info Button clicked')}
          tabIndex={0}
          disabled
        >
          Info Button
        </Button>
        <Button
          styleType="fill"
          color="error"
          onClick={() => console.log('Error Button clicked')}
          tabIndex={0}
          disabled
        >
          Error Button
        </Button>
        <Button
          styleType="fill"
          color="warning"
          onClick={() => console.log('Warning Button clicked')}
          tabIndex={0}
          disabled
        >
          Warning Button
        </Button>
        <Button
          styleType="fill"
          color="success"
          onClick={() => console.log('Success Button clicked')}
          tabIndex={0}
          disabled
        >
          Success Button
        </Button>
        <Button
          styleType="fill"
          color="light"
          onClick={() => console.log('Light Button clicked')}
          tabIndex={0}
          disabled
        >
          Light Button
        </Button>
        <Button
          styleType="fill"
          color="dark"
          onClick={() => console.log('Dark Button clicked')}
          tabIndex={0}
          disabled
        >
          Dark Button
        </Button>
      </div>
      <Separator orientation="horizontal" />
      <p class="text">Button Outline</p>
      <div class="flex flex-row items-center justify-start gap-2">
        <Button
          styleType="outline"
          color="info"
          onClick={() => console.log('Info Button clicked')}
          tabIndex={0}
        >
          Info Button
        </Button>
        <Button
          styleType="outline"
          color="error"
          onClick={() => console.log('Error Button clicked')}
          tabIndex={0}
        >
          Error Button
        </Button>
        <Button
          styleType="outline"
          color="warning"
          onClick={() => console.log('Warning Button clicked')}
          tabIndex={0}
        >
          Warning Button
        </Button>
        <Button
          styleType="outline"
          color="success"
          onClick={() => console.log('Success Button clicked')}
          tabIndex={0}
        >
          Success Button
        </Button>
        <Button
          styleType="outline"
          color="light"
          onClick={() => console.log('Light Button clicked')}
          tabIndex={0}
        >
          Light Button
        </Button>
        <Button
          styleType="outline"
          color="dark"
          onClick={() => console.log('Dark Button clicked')}
          tabIndex={0}
        >
          Dark Button
        </Button>
      </div>
      <div class="flex flex-row items-center justify-start gap-2">
        <Button
          styleType="outline"
          color="info"
          onClick={() => console.log('Info Button clicked')}
          tabIndex={0}
          disabled
        >
          Info Button
        </Button>
        <Button
          styleType="outline"
          color="error"
          onClick={() => console.log('Error Button clicked')}
          tabIndex={0}
          disabled
        >
          Error Button
        </Button>
        <Button
          styleType="outline"
          color="warning"
          onClick={() => console.log('Warning Button clicked')}
          tabIndex={0}
          disabled
        >
          Warning Button
        </Button>
        <Button
          styleType="outline"
          color="success"
          onClick={() => console.log('Success Button clicked')}
          tabIndex={0}
          disabled
        >
          Success Button
        </Button>
        <Button
          styleType="outline"
          color="light"
          onClick={() => console.log('Light Button clicked')}
          tabIndex={0}
          disabled
        >
          Light Button
        </Button>
        <Button
          styleType="outline"
          color="dark"
          onClick={() => console.log('Dark Button clicked')}
          tabIndex={0}
          disabled
        >
          Dark Button
        </Button>
      </div>
      <Separator orientation="horizontal" />
      <p class="text">Button Sizes</p>
      <div class="flex flex-row items-center justify-start gap-2">
        <Button
          styleType="fill"
          color="info"
          onClick={() => console.log('Info Button clicked')}
          tabIndex={0}
          size="small"
        >
          Info Button Small
        </Button>
        <Button
          styleType="fill"
          color="info"
          onClick={() => console.log('Info Button clicked')}
          tabIndex={0}
        >
          Info Button
        </Button>
        <Button
          styleType="fill"
          color="info"
          onClick={() => console.log('Info Button clicked')}
          tabIndex={0}
          size="medium"
        >
          Info Button Medium
        </Button>
        <Button
          styleType="fill"
          color="info"
          onClick={() => console.log('Info Button clicked')}
          tabIndex={0}
          size="large"
        >
          Info Button Large
        </Button>
      </div>
      <div class="flex flex-row items-center justify-start gap-2">
        <Button
          styleType="outline"
          color="info"
          onClick={() => console.log('Info Button clicked')}
          tabIndex={0}
          size="small"
        >
          Info Button Small
        </Button>
        <Button
          styleType="outline"
          color="info"
          onClick={() => console.log('Info Button clicked')}
          tabIndex={0}
        >
          Info Button
        </Button>
        <Button
          styleType="outline"
          color="info"
          onClick={() => console.log('Info Button clicked')}
          tabIndex={0}
          size="medium"
        >
          Info Button Medium
        </Button>
        <Button
          styleType="outline"
          color="info"
          onClick={() => console.log('Info Button clicked')}
          tabIndex={0}
          size="large"
        >
          Info Button Large
        </Button>
      </div>
      <p class="text">Full Width Button</p>
      <div class="flex flex-row items-center justify-start gap-2">
        <Button
          styleType="fill"
          color="info"
          onClick={() => console.log('Info Button clicked')}
          tabIndex={0}
          fullWidth
        >
          Info Button Full Width
        </Button>
      </div>
    </div>
  );
};

export default ButtonsExample;
