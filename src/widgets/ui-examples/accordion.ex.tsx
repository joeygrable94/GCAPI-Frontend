import { Accordion, AccordionItem } from '@getcommunity/gcui/accordion';
import { Component } from 'solid-js';

const AccordionsExample: Component = () => {
  return (
    <div id="accordion" class="flex flex-col gap-1 pb-24 pt-12">
      <h2 class="text-3xl font-bold">Accordion</h2>
      <p class="text-lg">This section demonstrates accordion styles.</p>
      <h3 class="mb-1 mt-4 text-xl">Outlined (default) & Filled Style Types</h3>
      <div class="flex w-full items-start gap-4">
        <div class="flex w-full flex-col gap-2">
          <Accordion collapsible size="small" curve="medium">
            <AccordionItem label="Accordion Item 1" value="item-1">
              <p>Accordion Item 1 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 2" value="item-2">
              <p>Accordion Item 2 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 3" value="item-3">
              <p>Accordion Item 3 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 4" value="item-4">
              <p>Accordion Item 4 Content</p>
            </AccordionItem>
          </Accordion>
          <Accordion collapsible size="small" curve="medium" styleType="fill">
            <AccordionItem label="Accordion Item 1" value="item-1">
              <p>Accordion Item 1 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 2" value="item-2">
              <p>Accordion Item 2 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 3" value="item-3">
              <p>Accordion Item 3 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 4" value="item-4">
              <p>Accordion Item 4 Content</p>
            </AccordionItem>
          </Accordion>
        </div>
        <div class="flex w-full flex-col gap-2">
          <Accordion collapsible color="info" size="small" curve="medium">
            <AccordionItem label="Accordion Item 1" value="item-1">
              <p>Accordion Item 1 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 2" value="item-2">
              <p>Accordion Item 2 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 3" value="item-3">
              <p>Accordion Item 3 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 4" value="item-4">
              <p>Accordion Item 4 Content</p>
            </AccordionItem>
          </Accordion>
          <Accordion
            collapsible
            color="info"
            size="small"
            curve="medium"
            styleType="fill"
          >
            <AccordionItem label="Accordion Item 1" value="item-1">
              <p>Accordion Item 1 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 2" value="item-2">
              <p>Accordion Item 2 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 3" value="item-3">
              <p>Accordion Item 3 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 4" value="item-4">
              <p>Accordion Item 4 Content</p>
            </AccordionItem>
          </Accordion>
        </div>
        <div class="flex w-full flex-col gap-2">
          <Accordion collapsible color="error" size="small" curve="medium">
            <AccordionItem label="Accordion Item 1" value="item-1">
              <p>Accordion Item 1 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 2" value="item-2">
              <p>Accordion Item 2 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 3" value="item-3">
              <p>Accordion Item 3 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 4" value="item-4">
              <p>Accordion Item 4 Content</p>
            </AccordionItem>
          </Accordion>
          <Accordion
            collapsible
            color="error"
            size="small"
            curve="medium"
            styleType="fill"
          >
            <AccordionItem label="Accordion Item 1" value="item-1">
              <p>Accordion Item 1 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 2" value="item-2">
              <p>Accordion Item 2 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 3" value="item-3">
              <p>Accordion Item 3 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 4" value="item-4">
              <p>Accordion Item 4 Content</p>
            </AccordionItem>
          </Accordion>
        </div>
        <div class="flex w-full flex-col gap-2">
          <Accordion collapsible color="warning" size="small" curve="medium">
            <AccordionItem label="Accordion Item 1" value="item-1">
              <p>Accordion Item 1 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 2" value="item-2">
              <p>Accordion Item 2 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 3" value="item-3">
              <p>Accordion Item 3 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 4" value="item-4">
              <p>Accordion Item 4 Content</p>
            </AccordionItem>
          </Accordion>
          <Accordion
            collapsible
            color="warning"
            size="small"
            curve="medium"
            styleType="fill"
          >
            <AccordionItem label="Accordion Item 1" value="item-1">
              <p>Accordion Item 1 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 2" value="item-2">
              <p>Accordion Item 2 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 3" value="item-3">
              <p>Accordion Item 3 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 4" value="item-4">
              <p>Accordion Item 4 Content</p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div class="mt-4 flex w-full items-start gap-4">
        <div class="flex w-full flex-col gap-2">
          <Accordion collapsible color="success" size="small" curve="medium">
            <AccordionItem label="Accordion Item 1" value="item-1">
              <p>Accordion Item 1 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 2" value="item-2">
              <p>Accordion Item 2 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 3" value="item-3">
              <p>Accordion Item 3 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 4" value="item-4">
              <p>Accordion Item 4 Content</p>
            </AccordionItem>
          </Accordion>
          <Accordion
            collapsible
            color="success"
            size="small"
            curve="medium"
            styleType="fill"
          >
            <AccordionItem label="Accordion Item 1" value="item-1">
              <p>Accordion Item 1 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 2" value="item-2">
              <p>Accordion Item 2 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 3" value="item-3">
              <p>Accordion Item 3 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 4" value="item-4">
              <p>Accordion Item 4 Content</p>
            </AccordionItem>
          </Accordion>
        </div>
        <div class="flex w-full flex-col gap-2">
          <Accordion collapsible color="light" size="small" curve="medium">
            <AccordionItem label="Accordion Item 1" value="item-1">
              <p>Accordion Item 1 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 2" value="item-2">
              <p>Accordion Item 2 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 3" value="item-3">
              <p>Accordion Item 3 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 4" value="item-4">
              <p>Accordion Item 4 Content</p>
            </AccordionItem>
          </Accordion>
          <Accordion
            collapsible
            color="light"
            size="small"
            curve="medium"
            styleType="fill"
          >
            <AccordionItem label="Accordion Item 1" value="item-1">
              <p>Accordion Item 1 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 2" value="item-2">
              <p>Accordion Item 2 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 3" value="item-3">
              <p>Accordion Item 3 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 4" value="item-4">
              <p>Accordion Item 4 Content</p>
            </AccordionItem>
          </Accordion>
        </div>
        <div class="flex w-full flex-col gap-2">
          <Accordion collapsible color="dark" size="small" curve="medium">
            <AccordionItem label="Accordion Item 1" value="item-1">
              <p>Accordion Item 1 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 2" value="item-2">
              <p>Accordion Item 2 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 3" value="item-3">
              <p>Accordion Item 3 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 4" value="item-4">
              <p>Accordion Item 4 Content</p>
            </AccordionItem>
          </Accordion>
          <Accordion
            collapsible
            color="dark"
            size="small"
            curve="medium"
            styleType="fill"
          >
            <AccordionItem label="Accordion Item 1" value="item-1">
              <p>Accordion Item 1 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 2" value="item-2">
              <p>Accordion Item 2 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 3" value="item-3">
              <p>Accordion Item 3 Content</p>
            </AccordionItem>
            <AccordionItem label="Accordion Item 4" value="item-4">
              <p>Accordion Item 4 Content</p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <h3 class="mb-1 mt-4 text-xl">Curvature</h3>
      <div class="flex w-full items-start gap-4">
        <Accordion collapsible curve="small">
          <AccordionItem label="Accordion Item 1" value="item-1">
            <p>Accordion Item 1 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 2" value="item-2">
            <p>Accordion Item 2 Content</p>
          </AccordionItem>
        </Accordion>
        <Accordion collapsible curve="default">
          <AccordionItem label="Accordion Item 1" value="item-1">
            <p>Accordion Item 1 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 2" value="item-2">
            <p>Accordion Item 2 Content</p>
          </AccordionItem>
        </Accordion>
        <Accordion collapsible curve="medium">
          <AccordionItem label="Accordion Item 1" value="item-1">
            <p>Accordion Item 1 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 2" value="item-2">
            <p>Accordion Item 2 Content</p>
          </AccordionItem>
        </Accordion>
        <Accordion collapsible curve="large">
          <AccordionItem label="Accordion Item 1" value="item-1">
            <p>Accordion Item 1 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 2" value="item-2">
            <p>Accordion Item 2 Content</p>
          </AccordionItem>
        </Accordion>
        <Accordion collapsible curve="full">
          <AccordionItem label="Accordion Item 1" value="item-1">
            <p>Accordion Item 1 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 2" value="item-2">
            <p>Accordion Item 2 Content</p>
          </AccordionItem>
        </Accordion>
      </div>
      <h3 class="mb-1 mt-4 text-xl">Sizes</h3>
      <div class="flex w-full items-start gap-4">
        <Accordion collapsible size="small">
          <AccordionItem label="Accordion Item 1" value="item-1">
            <p>Accordion Item 1 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 2" value="item-2">
            <p>Accordion Item 2 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 3" value="item-3">
            <p>Accordion Item 3 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 4" value="item-4">
            <p>Accordion Item 4 Content</p>
          </AccordionItem>
        </Accordion>
        <Accordion collapsible>
          <AccordionItem label="Accordion Item 1" value="item-1">
            <p>Accordion Item 1 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 2" value="item-2">
            <p>Accordion Item 2 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 3" value="item-3">
            <p>Accordion Item 3 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 4" value="item-4">
            <p>Accordion Item 4 Content</p>
          </AccordionItem>
        </Accordion>
        <Accordion collapsible size="medium">
          <AccordionItem label="Accordion Item 1" value="item-1">
            <p>Accordion Item 1 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 2" value="item-2">
            <p>Accordion Item 2 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 3" value="item-3">
            <p>Accordion Item 3 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 4" value="item-4">
            <p>Accordion Item 4 Content</p>
          </AccordionItem>
        </Accordion>
        <Accordion collapsible size="large">
          <AccordionItem label="Accordion Item 1" value="item-1">
            <p>Accordion Item 1 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 2" value="item-2">
            <p>Accordion Item 2 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 3" value="item-3">
            <p>Accordion Item 3 Content</p>
          </AccordionItem>
          <AccordionItem label="Accordion Item 4" value="item-4">
            <p>Accordion Item 4 Content</p>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default AccordionsExample;
