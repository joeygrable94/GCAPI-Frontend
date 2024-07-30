import { ButtonToggle } from '@getcommunity/gcui/button';
import { AudioOff, AudioOn } from '@getcommunity/gcui/icon';
import { Component } from 'solid-js';

const ButtonTogglesExample: Component = () => {
  return (
    <div id="button-toggles" class="flex flex-col gap-4 pb-24 pt-12">
      <h2 class="text-3xl font-bold">Button Toggle</h2>
      <p class="text-lg">
        This section demonstrates button toggles with various styles and states.
      </p>
      <div class="flex flex-wrap items-center gap-2">
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          styleType="fill"
          curve="none"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          styleType="fill"
          curve="large"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          styleType="fill"
          curve="full"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          styleType="outline"
          curve="none"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          styleType="outline"
          curve="large"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          styleType="outline"
          curve="full"
        />
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <ButtonToggle
          iconActive={<AudioOn size="small" />}
          iconInactive={<AudioOff size="small" />}
          size="small"
          color="info"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          size="default"
          color="info"
        />
        <ButtonToggle
          iconActive={<AudioOn size="medium" />}
          iconInactive={<AudioOff size="medium" />}
          size="medium"
          color="info"
        />
        <ButtonToggle
          iconActive={<AudioOn size="large" />}
          iconInactive={<AudioOff size="large" />}
          size="large"
          color="info"
        />
        <ButtonToggle
          iconActive={<AudioOn size="small" />}
          iconInactive={<AudioOff size="small" />}
          size="small"
          color="error"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          size="default"
          color="error"
        />
        <ButtonToggle
          iconActive={<AudioOn size="medium" />}
          iconInactive={<AudioOff size="medium" />}
          size="medium"
          color="error"
        />
        <ButtonToggle
          iconActive={<AudioOn size="large" />}
          iconInactive={<AudioOff size="large" />}
          size="large"
          color="error"
        />
        <ButtonToggle
          iconActive={<AudioOn size="small" />}
          iconInactive={<AudioOff size="small" />}
          size="small"
          color="warning"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          size="default"
          color="warning"
        />
        <ButtonToggle
          iconActive={<AudioOn size="medium" />}
          iconInactive={<AudioOff size="medium" />}
          size="medium"
          color="warning"
        />
        <ButtonToggle
          iconActive={<AudioOn size="large" />}
          iconInactive={<AudioOff size="large" />}
          size="large"
          color="warning"
        />
        <ButtonToggle
          iconActive={<AudioOn size="small" />}
          iconInactive={<AudioOff size="small" />}
          size="small"
          color="success"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          size="default"
          color="success"
        />
        <ButtonToggle
          iconActive={<AudioOn size="medium" />}
          iconInactive={<AudioOff size="medium" />}
          size="medium"
          color="success"
        />
        <ButtonToggle
          iconActive={<AudioOn size="large" />}
          iconInactive={<AudioOff size="large" />}
          size="large"
          color="success"
        />
        <ButtonToggle
          iconActive={<AudioOn size="small" />}
          iconInactive={<AudioOff size="small" />}
          size="small"
          color="light"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          size="default"
          color="light"
        />
        <ButtonToggle
          iconActive={<AudioOn size="medium" />}
          iconInactive={<AudioOff size="medium" />}
          size="medium"
          color="light"
        />
        <ButtonToggle
          iconActive={<AudioOn size="large" />}
          iconInactive={<AudioOff size="large" />}
          size="large"
          color="light"
        />
        <ButtonToggle
          iconActive={<AudioOn size="small" />}
          iconInactive={<AudioOff size="small" />}
          size="small"
          color="dark"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          size="default"
          color="dark"
        />
        <ButtonToggle
          iconActive={<AudioOn size="medium" />}
          iconInactive={<AudioOff size="medium" />}
          size="medium"
          color="dark"
        />
        <ButtonToggle
          iconActive={<AudioOn size="large" />}
          iconInactive={<AudioOff size="large" />}
          size="large"
          color="dark"
        />
        <ButtonToggle
          iconActive={<AudioOn size="small" />}
          iconInactive={<AudioOff size="small" />}
          size="small"
          color="info"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          size="default"
          color="info"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="medium" />}
          iconInactive={<AudioOff size="medium" />}
          size="medium"
          color="info"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="large" />}
          iconInactive={<AudioOff size="large" />}
          size="large"
          color="info"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="small" />}
          iconInactive={<AudioOff size="small" />}
          size="small"
          color="error"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          size="default"
          color="error"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="medium" />}
          iconInactive={<AudioOff size="medium" />}
          size="medium"
          color="error"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="large" />}
          iconInactive={<AudioOff size="large" />}
          size="large"
          color="error"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="small" />}
          iconInactive={<AudioOff size="small" />}
          size="small"
          color="warning"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          size="default"
          color="warning"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="medium" />}
          iconInactive={<AudioOff size="medium" />}
          size="medium"
          color="warning"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="large" />}
          iconInactive={<AudioOff size="large" />}
          size="large"
          color="warning"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="small" />}
          iconInactive={<AudioOff size="small" />}
          size="small"
          color="success"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          size="default"
          color="success"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="medium" />}
          iconInactive={<AudioOff size="medium" />}
          size="medium"
          color="success"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="large" />}
          iconInactive={<AudioOff size="large" />}
          size="large"
          color="success"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="small" />}
          iconInactive={<AudioOff size="small" />}
          size="small"
          color="light"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          size="default"
          color="light"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="medium" />}
          iconInactive={<AudioOff size="medium" />}
          size="medium"
          color="light"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="large" />}
          iconInactive={<AudioOff size="large" />}
          size="large"
          color="light"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="small" />}
          iconInactive={<AudioOff size="small" />}
          size="small"
          color="dark"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn />}
          iconInactive={<AudioOff />}
          size="default"
          color="dark"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="medium" />}
          iconInactive={<AudioOff size="medium" />}
          size="medium"
          color="dark"
          styleType="outline"
        />
        <ButtonToggle
          iconActive={<AudioOn size="large" />}
          iconInactive={<AudioOff size="large" />}
          size="large"
          color="dark"
          styleType="outline"
        />
      </div>
    </div>
  );
};

export default ButtonTogglesExample;
