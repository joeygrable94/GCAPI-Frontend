import { Button } from '@getcommunity/gcui/button';
import { Popover } from '@getcommunity/gcui/popover';
import { Component, createEffect, createSignal, onMount } from 'solid-js';

let btnAnkrDefault: HTMLElement | undefined;
let btnAnkrInfo: HTMLElement | undefined;
let btnAnkrError: HTMLElement | undefined;
let btnAnkrWarning: HTMLElement | undefined;
let btnAnkrSuccess: HTMLElement | undefined;
let btnAnkrLight: HTMLElement | undefined;
let btnAnkrDark: HTMLElement | undefined;

const PopoversExample: Component = () => {
  const [openDefault, setOpenDefault] = createSignal(false);
  const [openInfo, setOpenInfo] = createSignal(false);
  const [openError, setOpenError] = createSignal(false);
  const [openWarning, setOpenWarning] = createSignal(false);
  const [openSuccess, setOpenSuccess] = createSignal(false);
  const [openLight, setOpenLight] = createSignal(false);
  const [openDark, setOpenDark] = createSignal(false);
  const [anchorDefault, setAnkrDefault] = createSignal<HTMLElement | undefined>(
    btnAnkrDefault
  );
  const [anchorInfo, setAnkrInfo] = createSignal<HTMLElement | undefined>(btnAnkrInfo);
  const [anchorError, setAnkrError] = createSignal<HTMLElement | undefined>(
    btnAnkrError
  );
  const [anchorWarning, setAnkrWarning] = createSignal<HTMLElement | undefined>(
    btnAnkrWarning
  );
  const [anchorSuccess, setAnkrSuccess] = createSignal<HTMLElement | undefined>(
    btnAnkrSuccess
  );
  const [anchorLight, setAnkrLight] = createSignal<HTMLElement | undefined>(
    btnAnkrLight
  );
  const [anchorDark, setAnkrDark] = createSignal<HTMLElement | undefined>(btnAnkrDark);
  onMount(() => {
    setAnkrDefault(document.getElementById('popover-trigger-default') as HTMLElement);
    setAnkrInfo(document.getElementById('popover-trigger-info') as HTMLElement);
    setAnkrError(document.getElementById('popover-trigger-error') as HTMLElement);
    setAnkrWarning(document.getElementById('popover-trigger-warning') as HTMLElement);
    setAnkrSuccess(document.getElementById('popover-trigger-success') as HTMLElement);
    setAnkrLight(document.getElementById('popover-trigger-light') as HTMLElement);
    setAnkrDark(document.getElementById('popover-trigger-dark') as HTMLElement);
  });
  createEffect(() => {
    console.log('default', openDefault());
  });
  return (
    <div id='btns' class='flex flex-col gap-4 pb-24 pt-12'>
      <h2 class='text-3xl font-bold'>Popovers</h2>
      <p class='text-lg'>This section demonstrates various popover styles.</p>
      <div class='flex flex-row items-center justify-start gap-2'>
        <Button
          id='popover-trigger-default'
          styleType='fill'
          color='light'
          tabIndex={0}
          onClick={() => setOpenDefault(!openDefault())}
        >
          Default Popover
        </Button>
        <Popover
          label='default popover'
          title='Default Popover Title'
          open={openDefault()}
          onOpenChange={setOpenDefault}
          anchorRef={anchorDefault}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab voluptas
          doloribus ipsum dolorum iste quia delectus nemo itaque, inventore ducimus
          perspiciatis soluta ratione sed nostrum molestiae aut minima, quasi quisquam.
        </Popover>
        <Button
          id='popover-trigger-info'
          styleType='fill'
          color='info'
          tabIndex={0}
          onClick={() => setOpenInfo(!openInfo())}
        >
          Info Popover
        </Button>
        <Popover
          label='info popover'
          title='Info Popover Title'
          open={openInfo()}
          onOpenChange={setOpenInfo}
          anchorRef={anchorInfo}
          color='info'
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab voluptas
          doloribus ipsum dolorum iste quia delectus nemo itaque, inventore ducimus
          perspiciatis soluta ratione sed nostrum molestiae aut minima, quasi quisquam.
        </Popover>
        <Button
          id='popover-trigger-error'
          styleType='fill'
          color='error'
          tabIndex={0}
          onClick={() => setOpenError(!openError())}
        >
          Error Popover
        </Button>
        <Popover
          label='error popover'
          title='Error Popover Title'
          open={openError()}
          onOpenChange={setOpenError}
          anchorRef={anchorError}
          color='error'
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab voluptas
          doloribus ipsum dolorum iste quia delectus nemo itaque, inventore ducimus
          perspiciatis soluta ratione sed nostrum molestiae aut minima, quasi quisquam.
        </Popover>
        <Button
          id='popover-trigger-warning'
          styleType='fill'
          color='warning'
          tabIndex={0}
          onClick={() => setOpenWarning(!openWarning())}
        >
          Warning Popover
        </Button>
        <Popover
          label='warning popover'
          title='Warning Popover Title'
          open={openWarning()}
          onOpenChange={setOpenWarning}
          anchorRef={anchorWarning}
          color='warning'
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab voluptas
          doloribus ipsum dolorum iste quia delectus nemo itaque, inventore ducimus
          perspiciatis soluta ratione sed nostrum molestiae aut minima, quasi quisquam.
        </Popover>
        <Button
          id='popover-trigger-success'
          styleType='fill'
          color='success'
          tabIndex={0}
          onClick={() => setOpenSuccess(!openSuccess())}
        >
          Success Popover
        </Button>
        <Popover
          label='success popover'
          title='Success Popover Title'
          open={openSuccess()}
          onOpenChange={setOpenSuccess}
          anchorRef={anchorSuccess}
          color='success'
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab voluptas
          doloribus ipsum dolorum iste quia delectus nemo itaque, inventore ducimus
          perspiciatis soluta ratione sed nostrum molestiae aut minima, quasi quisquam.
        </Popover>
        <Button
          id='popover-trigger-light'
          styleType='fill'
          color='light'
          tabIndex={0}
          onClick={() => setOpenLight(!openLight())}
        >
          Light Popover
        </Button>
        <Popover
          label='light popover'
          title='Light Popover Title'
          open={openLight()}
          onOpenChange={setOpenLight}
          anchorRef={anchorLight}
          color='light'
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab voluptas
          doloribus ipsum dolorum iste quia delectus nemo itaque, inventore ducimus
          perspiciatis soluta ratione sed nostrum molestiae aut minima, quasi quisquam.
        </Popover>
        <Button
          id='popover-trigger-dark'
          styleType='fill'
          color='dark'
          tabIndex={0}
          onClick={() => setOpenDark(!openDark())}
        >
          Dark Popover
        </Button>
        <Popover
          label='dark popover'
          title='Dark Popover Title'
          open={openDark()}
          onOpenChange={setOpenDark}
          anchorRef={anchorDark}
          color='dark'
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab voluptas
          doloribus ipsum dolorum iste quia delectus nemo itaque, inventore ducimus
          perspiciatis soluta ratione sed nostrum molestiae aut minima, quasi quisquam.
        </Popover>
      </div>
    </div>
  );
};

export default PopoversExample;
