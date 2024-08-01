import { Collapsable } from '@getcommunity/gcui/accordion';
import { Component, createSignal } from 'solid-js';

const CollapsablesExample: Component = () => {
  const [open, setOpen] = createSignal(false);
  return (
    <div id='accordion' class='flex flex-col gap-1 pb-24 pt-12'>
      <h2 class='text-3xl font-bold'>Collapsables</h2>
      <p class='text-lg'>This section demonstrates collapsible styles and states.</p>
      <h3 class='mb-1 mt-4 text-xl'>Outlined (default) & Filled Style Types</h3>
      <div class='flex w-full items-start gap-4'>
        <div class='flex w-full flex-col gap-2'>
          <Collapsable
            label='Collapsable (default)'
            open={open()}
            onOpenChange={setOpen}
            size='small'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='Info Collapsable'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            color='info'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='Error Collapsable'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            color='error'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='Warning Collapsable'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            color='warning'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='Success Collapsable'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            color='success'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='Light Collapsable'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            color='light'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='Dark Collapsable'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            color='dark'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
        </div>
        <div class='flex w-full flex-col gap-2'>
          <Collapsable
            label='Collapsable (default)'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            styleType='fill'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='Info Collapsable'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            styleType='fill'
            color='info'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='Error Collapsable'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            styleType='fill'
            color='error'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='Warning Collapsable'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            styleType='fill'
            color='warning'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='Success Collapsable'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            styleType='fill'
            color='success'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='Light Collapsable'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            styleType='fill'
            color='light'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='Dark Collapsable'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            styleType='fill'
            color='dark'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
        </div>
      </div>
      <h3 class='mb-1 mt-4 text-xl'>Curvature</h3>
      <div class='flex w-full items-start gap-4'>
        <div class='flex w-full flex-col gap-2'>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            curve='small'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='default'
            curve='small'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='medium'
            curve='small'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='large'
            curve='small'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
        </div>
        <div class='flex w-full flex-col gap-2'>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            curve='default'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='default'
            curve='default'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='medium'
            curve='default'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='large'
            curve='default'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
        </div>
        <div class='flex w-full flex-col gap-2'>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            curve='medium'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='default'
            curve='medium'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='medium'
            curve='medium'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='large'
            curve='medium'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
        </div>
        <div class='flex w-full flex-col gap-2'>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='small'
            curve='full'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='default'
            curve='full'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='medium'
            curve='full'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
          <Collapsable
            label='What is Kobalte?'
            open={open()}
            onOpenChange={setOpen}
            size='large'
            curve='full'
          >
            <p>
              Kobalte is a UI toolkit for building accessible web apps and design
              systems with SolidJS. It provides a set of low-level UI components and
              primitives which can be the foundation for your design system
              implementation.
            </p>
          </Collapsable>
        </div>
      </div>
      <h3 class='mb-1 mt-4 text-xl'>Sizes</h3>
      <div class='flex w-full items-start gap-4'>
        <Collapsable
          label='What is Kobalte?'
          open={open()}
          onOpenChange={setOpen}
          size='small'
        >
          <p>
            Kobalte is a UI toolkit for building accessible web apps and design systems
            with SolidJS. It provides a set of low-level UI components and primitives
            which can be the foundation for your design system implementation.
          </p>
        </Collapsable>
        <Collapsable
          label='What is Kobalte?'
          open={open()}
          onOpenChange={setOpen}
          size='default'
        >
          <p>
            Kobalte is a UI toolkit for building accessible web apps and design systems
            with SolidJS. It provides a set of low-level UI components and primitives
            which can be the foundation for your design system implementation.
          </p>
        </Collapsable>
        <Collapsable
          label='What is Kobalte?'
          open={open()}
          onOpenChange={setOpen}
          size='medium'
        >
          <p>
            Kobalte is a UI toolkit for building accessible web apps and design systems
            with SolidJS. It provides a set of low-level UI components and primitives
            which can be the foundation for your design system implementation.
          </p>
        </Collapsable>
        <Collapsable
          label='What is Kobalte?'
          open={open()}
          onOpenChange={setOpen}
          size='large'
        >
          <p>
            Kobalte is a UI toolkit for building accessible web apps and design systems
            with SolidJS. It provides a set of low-level UI components and primitives
            which can be the foundation for your design system implementation.
          </p>
        </Collapsable>
      </div>
    </div>
  );
};

export default CollapsablesExample;
