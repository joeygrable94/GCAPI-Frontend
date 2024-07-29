import { Component } from 'solid-js';
import { Separator } from '~/shared/ui/separator';

const SeparatorsExample: Component = () => {
  return (
    <div id="separators" class="flex flex-col gap-4 pb-24 pt-12">
      <h2 class="text-3xl font-bold">Separators</h2>
      <p class="text-lg">Separators</p>
      <div class="flex flex-col gap-2">
        <p>Horizontal Item</p>
        <Separator orientation="horizontal" />
        <p>Horizontal Item</p>
        <Separator orientation="horizontal" />
        <p>Horizontal Item</p>
      </div>
      <div class="mt-5 flex h-7 gap-4">
        <p>Vertical Item</p>
        <Separator orientation="vertical" />
        <p>Vertical Item</p>
        <Separator orientation="vertical" />
        <p>Vertical Item</p>
      </div>
      <p class="mt-5 text-lg">Separators: Variable Line Weight</p>
      <div class="flex flex-col gap-2">
        <p>Item</p>
        <Separator orientation="horizontal" size={10} weight={1} />
        <p>Item</p>
        <Separator orientation="horizontal" size={10} weight={2} />
        <p>Item</p>
        <Separator orientation="horizontal" size={10} weight={3} />
        <p>Item</p>
        <Separator orientation="horizontal" size={10} weight={4} />
        <p>Item</p>
        <Separator orientation="horizontal" size={10} weight={8} />
        <p>Item Rounded Separator</p>
        <Separator orientation="horizontal" size={10} weight={8} rounded />
        <p>Item Rounded Separator</p>
      </div>
      <p class="mt-5 text-lg">Separators: Partial Width</p>
      <div class="flex flex-col gap-2">
        <p>Item 90%</p>
        <Separator orientation="horizontal" size={90} />
        <p>Item 50%</p>
        <Separator orientation="horizontal" size={50} />
        <p>Item 26.4%</p>
        <Separator orientation="horizontal" size={26.4} />
        <p>Item 10%</p>
        <Separator orientation="horizontal" size={10} />
        <p>Item</p>
      </div>
      <p class="mt-5 text-lg">Separators: Alternate Alignment</p>
      <div class="flex flex-col gap-2">
        <p>Item 75% Align Start</p>
        <Separator orientation="horizontal" size={75} align="start" />
        <p>Item 75% Align Center</p>
        <Separator orientation="horizontal" size={75} align="center" />
        <p>Item 75% Align End</p>
        <Separator orientation="horizontal" size={75} align="end" />
        <p>Item 75% Align Default</p>
        <Separator orientation="horizontal" size={75} />
        <p>Item</p>
      </div>
    </div>
  );
};

export default SeparatorsExample;
