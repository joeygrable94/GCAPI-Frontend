import { Component } from 'solid-js';
import { Tab, Tabs } from '~/shared/ui/tabs';

const TabsExample: Component = () => {
  return (
    <div id="alerts" class="flex flex-col gap-4 pb-24 pt-12">
      <h2 class="text-3xl font-bold">Tabs</h2>
      <p class="text-xl">This section demonstrates how tabs work.</p>
      <p class="text-lg">Tab Colors</p>
      <div class="flex flex-wrap">
        <div class="w-full max-w-[33%]">
          <Tabs label="My Tabs" className="my-8">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="info">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="error">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="warning">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="success">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="light">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="dark">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
        </div>
        <div class="w-full max-w-[33%]">
          <Tabs label="My Tabs" className="my-8" styleType="fill">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="info" styleType="fill">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="error" styleType="fill">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="warning" styleType="fill">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="success" styleType="fill">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="light" styleType="fill">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="dark" styleType="fill">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
        </div>
        <div class="w-full max-w-[33%]">
          <Tabs label="My Tabs" className="my-8" styleType="outline">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="info" styleType="outline">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="error" styleType="outline">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="warning" styleType="outline">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="success" styleType="outline">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="light" styleType="outline">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
          <Tabs label="My Tabs" className="my-8" color="dark" styleType="outline">
            <Tab label="Tab 1" value="tab-1">
              Tab Content 1
            </Tab>
            <Tab label="Tab 2" value="tab-2">
              Tab Content 2
            </Tab>
            <Tab label="Tab 3" value="tab-3">
              Tab Content 3
            </Tab>
          </Tabs>
        </div>
      </div>
      <p class="text-lg">Tab Sizes</p>
      <div class="flex flex-col">
        <Tabs label="My Tabs" className="my-8" size="small">
          <Tab label="Tab 1" value="tab-1">
            Tab Content 1
          </Tab>
          <Tab label="Tab 2" value="tab-2">
            Tab Content 2
          </Tab>
          <Tab label="Tab 3" value="tab-3">
            Tab Content 3
          </Tab>
        </Tabs>
        <Tabs label="My Tabs" className="my-8" size="default">
          <Tab label="Tab 1" value="tab-1">
            Tab Content 1
          </Tab>
          <Tab label="Tab 2" value="tab-2">
            Tab Content 2
          </Tab>
          <Tab label="Tab 3" value="tab-3">
            Tab Content 3
          </Tab>
        </Tabs>
        <Tabs label="My Tabs" className="my-8" size="medium">
          <Tab label="Tab 1" value="tab-1">
            Tab Content 1
          </Tab>
          <Tab label="Tab 2" value="tab-2">
            Tab Content 2
          </Tab>
          <Tab label="Tab 3" value="tab-3">
            Tab Content 3
          </Tab>
        </Tabs>
        <Tabs label="My Tabs" className="my-8" size="large">
          <Tab label="Tab 1" value="tab-1">
            Tab Content 1
          </Tab>
          <Tab label="Tab 2" value="tab-2">
            Tab Content 2
          </Tab>
          <Tab label="Tab 3" value="tab-3">
            Tab Content 3
          </Tab>
        </Tabs>
        <Tabs label="My Tabs" className="my-8" orientation="vertical" size="small">
          <Tab label="Tab 1" value="tab-1">
            Tab Content 1
          </Tab>
          <Tab label="Tab 2" value="tab-2">
            Tab Content 2
          </Tab>
          <Tab label="Tab 3" value="tab-3">
            Tab Content 3
          </Tab>
        </Tabs>
        <Tabs label="My Tabs" className="my-8" orientation="vertical" size="default">
          <Tab label="Tab 1" value="tab-1">
            Tab Content 1
          </Tab>
          <Tab label="Tab 2" value="tab-2">
            Tab Content 2
          </Tab>
          <Tab label="Tab 3" value="tab-3">
            Tab Content 3
          </Tab>
        </Tabs>
        <Tabs label="My Tabs" className="my-8" orientation="vertical" size="medium">
          <Tab label="Tab 1" value="tab-1">
            Tab Content 1
          </Tab>
          <Tab label="Tab 2" value="tab-2">
            Tab Content 2
          </Tab>
          <Tab label="Tab 3" value="tab-3">
            Tab Content 3
          </Tab>
        </Tabs>
        <Tabs label="My Tabs" className="my-8" orientation="vertical" size="large">
          <Tab label="Tab 1" value="tab-1">
            Tab Content 1
          </Tab>
          <Tab label="Tab 2" value="tab-2">
            Tab Content 2
          </Tab>
          <Tab label="Tab 3" value="tab-3">
            Tab Content 3
          </Tab>
        </Tabs>
      </div>
      <p class="text-xl">Tab States</p>
      <div class="flex flex-col">
        <p class="text-xl">Tabs Disabled</p>
        <Tabs label="My Tabs" className="my-8" disabled>
          <Tab label="Tab 1" value="tab-1">
            Tab Content 1
          </Tab>
          <Tab label="Tab 2" value="tab-2">
            Tab Content 2
          </Tab>
          <Tab label="Tab 3" value="tab-3">
            Tab Content 3
          </Tab>
        </Tabs>
        <p class="text-xl">Inidividual Tab Disabled</p>
        <Tabs label="My Tabs" className="my-8" orientation="vertical">
          <Tab label="Tab 1" value="tab-1">
            Tab Content 1
          </Tab>
          <Tab label="Tab 2 (Disabled)" value="tab-2" disabled>
            Tab Content 2
          </Tab>
          <Tab label="Tab 3" value="tab-3">
            Tab Content 3
          </Tab>
        </Tabs>
      </div>
      <p class="text-xl">Square Tabs</p>
      <div class="flex flex-col">
        <Tabs label="My Tabs" className="my-8" curve="none">
          <Tab label="Tab 1" value="tab-1">
            Tab Content 1
          </Tab>
          <Tab label="Tab 2" value="tab-2">
            Tab Content 2
          </Tab>
          <Tab label="Tab 3" value="tab-3">
            Tab Content 3
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default TabsExample;
