import { AvatarImage } from '@getcommunity/gcui/avatar';
import { Component } from 'solid-js';

const AvatarExample: Component = () => {
  return (
    <div id="avatar" class="flex flex-col gap-1 pb-24 pt-12">
      <h2 class="text-3xl font-bold">Avatar Images</h2>
      <p class="text-lg">This section demonstrates various avatar images.</p>
      <div class="flex flex-row gap-2">
        <AvatarImage src="https://getcommunity.com/wp-content/uploads/2022/09/Joey-Grable_geo.jpg" />
        <AvatarImage />
        <AvatarImage
          src="https://getcommunity.com/wp-content/uploads/2022/09/Joey-Grable_geo.jpg"
          width={40}
        />
      </div>
    </div>
  );
};

export default AvatarExample;
