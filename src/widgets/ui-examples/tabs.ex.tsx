import { Tab, Tabs } from '@getcommunity/gcui/tabs';
import { Component } from 'solid-js';

const TabsExample: Component = () => {
  return (
    <div id="alerts" class="flex flex-col gap-4 pb-24 pt-12">
      <h2 class="text-3xl font-bold">Tabs</h2>
      <p class="text-xl">This section demonstrates how tabs work.</p>
      <p class="text-lg">Tab Colors</p>
      <div class="flex flex-wrap">
        <div class="w-full max-w-[33%]">
          <Tabs label="My Tabs">
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
          <Tabs label="My Tabs" color="info">
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
          <Tabs label="My Tabs" color="error">
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
          <Tabs label="My Tabs" color="warning">
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
          <Tabs label="My Tabs" color="success">
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
          <Tabs label="My Tabs" color="light">
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
          <Tabs label="My Tabs" color="dark">
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
          <Tabs label="My Tabs" styleType="fill">
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
          <Tabs label="My Tabs" color="info" styleType="fill">
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
          <Tabs label="My Tabs" color="error" styleType="fill">
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
          <Tabs label="My Tabs" color="warning" styleType="fill">
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
          <Tabs label="My Tabs" color="success" styleType="fill">
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
          <Tabs label="My Tabs" color="light" styleType="fill">
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
          <Tabs label="My Tabs" color="dark" styleType="fill">
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
          <Tabs label="My Tabs" styleType="outline">
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
          <Tabs label="My Tabs" color="info" styleType="outline">
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
          <Tabs label="My Tabs" color="error" styleType="outline">
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
          <Tabs label="My Tabs" color="warning" styleType="outline">
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
          <Tabs label="My Tabs" color="success" styleType="outline">
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
          <Tabs label="My Tabs" color="light" styleType="outline">
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
          <Tabs label="My Tabs" color="dark" styleType="outline">
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
        <Tabs label="My Tabs" size="small">
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
        <Tabs label="My Tabs" size="default">
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
        <Tabs label="My Tabs" size="medium">
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
        <Tabs label="My Tabs" size="large">
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
        <Tabs label="My Tabs" orientation="vertical" size="small">
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
        <Tabs label="My Tabs" orientation="vertical" size="default">
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
        <Tabs label="My Tabs" orientation="vertical" size="medium">
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
        <Tabs label="My Tabs" orientation="vertical" size="large">
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
        <Tabs label="My Tabs" disabled>
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
        <Tabs label="My Tabs" orientation="vertical">
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
        <Tabs label="My Tabs" curve="none">
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
