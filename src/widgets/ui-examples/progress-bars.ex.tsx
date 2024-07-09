import { Component, createSignal, onMount } from 'solid-js';
import { ProgressBar } from '~/shared/ui/progress';

const ProgressBarsExample: Component = () => {
  const [progressValue, setProgressValue] = createSignal(0);
  const [direction, setDirection] = createSignal<'up' | 'down'>('up');
  const oscillateProgress = () => {
    let progress = 0;
    setInterval(() => {
      if (direction() === 'up') {
        if (progress >= 20) {
          progress = 20;
          setTimeout(() => setDirection('down'), 1500);
        } else {
          progress += 1;
        }
      }
      if (direction() === 'down') {
        if (progress <= 0) {
          progress = 0;
          setTimeout(() => setDirection('up'), 1500);
        } else {
          progress -= 1;
        }
      }
      setProgressValue(progress);
    }, 100);
  };
  onMount(() => oscillateProgress());
  return (
    <div id="progress-bars" class="flex flex-col gap-4 pb-24 pt-12">
      <h2 class="text-3xl font-bold">Progress Bars</h2>
      <p class="text-lg">
        This section demonstrates progress bars with various styles and states.
      </p>
      <div class="flex flex-wrap items-start gap-6">
        <div class="flex flex-col items-start gap-2">
          <ProgressBar value={25} label="Loading..." color="info" />
          <ProgressBar value={100} label="Loading..." color="info" />
          <ProgressBar
            value={progressValue()}
            minValue={0}
            maxValue={20}
            label="Loading..."
            color="info"
          />
        </div>
        <div class="flex flex-col items-start gap-2">
          <ProgressBar value={25} label="Loading..." color="error" />
          <ProgressBar value={100} label="Loading..." color="error" />
          <ProgressBar
            value={progressValue()}
            minValue={0}
            maxValue={20}
            label="Loading..."
            color="error"
          />
        </div>
        <div class="flex flex-col items-start gap-2">
          <ProgressBar value={25} label="Loading..." color="warning" />
          <ProgressBar value={100} label="Loading..." color="warning" />
          <ProgressBar
            value={progressValue()}
            minValue={0}
            maxValue={20}
            label="Loading..."
            color="warning"
          />
        </div>
        <div class="flex flex-col items-start gap-2">
          <ProgressBar value={25} label="Loading..." color="success" />
          <ProgressBar value={100} label="Loading..." color="success" />
          <ProgressBar
            value={progressValue()}
            minValue={0}
            maxValue={20}
            label="Loading..."
            color="success"
          />
        </div>
        <div class="flex flex-col items-start gap-2">
          <ProgressBar value={25} label="Loading..." color="light" />
          <ProgressBar value={100} label="Loading..." color="light" />
          <ProgressBar
            value={progressValue()}
            minValue={0}
            maxValue={20}
            label="Loading..."
            color="light"
          />
        </div>
        <div class="flex flex-col items-start gap-2">
          <ProgressBar value={25} label="Loading..." color="dark" />
          <ProgressBar value={100} label="Loading..." color="dark" />
          <ProgressBar
            value={progressValue()}
            minValue={0}
            maxValue={20}
            label="Loading..."
            color="dark"
          />
        </div>
      </div>
      <div class="flex flex-wrap items-start gap-6">
        <div class="flex flex-col items-start gap-2">
          <ProgressBar value={25} label="Loading..." size="small" />
          <ProgressBar value={100} label="Loading..." size="small" />
          <ProgressBar
            value={progressValue()}
            minValue={0}
            maxValue={20}
            label="Loading..."
            size="small"
          />
        </div>
        <div class="flex flex-col items-start gap-2">
          <ProgressBar value={25} label="Loading..." />
          <ProgressBar value={100} label="Loading..." />
          <ProgressBar
            value={progressValue()}
            minValue={0}
            maxValue={20}
            label="Loading..."
          />
        </div>
        <div class="flex flex-col items-start gap-2">
          <ProgressBar value={25} label="Loading..." size="medium" />
          <ProgressBar value={100} label="Loading..." size="medium" />
          <ProgressBar
            value={progressValue()}
            minValue={0}
            maxValue={20}
            label="Loading..."
            size="medium"
          />
        </div>
        <div class="flex flex-col items-start gap-2">
          <ProgressBar value={25} label="Loading..." size="large" />
          <ProgressBar value={100} label="Loading..." size="large" />
          <ProgressBar
            value={progressValue()}
            minValue={0}
            maxValue={20}
            label="Loading..."
            size="large"
          />
        </div>
      </div>
      <div class="flex flex-wrap items-start gap-6">
        <div class="flex flex-col items-start gap-2">
          <ProgressBar value={25} label="Loading..." size="small" curve="full" />
          <ProgressBar value={100} label="Loading..." size="small" curve="full" />
          <ProgressBar
            value={progressValue()}
            minValue={0}
            maxValue={20}
            label="Loading..."
            size="small"
            curve="full"
          />
        </div>
        <div class="flex flex-col items-start gap-2">
          <ProgressBar value={25} label="Loading..." curve="full" />
          <ProgressBar value={100} label="Loading..." curve="full" />
          <ProgressBar
            value={progressValue()}
            minValue={0}
            maxValue={20}
            label="Loading..."
            curve="full"
          />
        </div>
        <div class="flex flex-col items-start gap-2">
          <ProgressBar value={25} label="Loading..." size="medium" curve="full" />
          <ProgressBar value={100} label="Loading..." size="medium" curve="full" />
          <ProgressBar
            value={progressValue()}
            minValue={0}
            maxValue={20}
            label="Loading..."
            size="medium"
            curve="full"
          />
        </div>
        <div class="flex flex-col items-start gap-2">
          <ProgressBar value={25} label="Loading..." size="large" curve="full" />
          <ProgressBar value={100} label="Loading..." size="large" curve="full" />
          <ProgressBar
            value={progressValue()}
            minValue={0}
            maxValue={20}
            label="Loading..."
            size="large"
            curve="full"
          />
        </div>
      </div>
      <div class="flex flex-wrap items-start gap-6">
        <ProgressBar value={50} label="Loading..." fullWidth={true} />
        <ProgressBar
          value={progressValue()}
          minValue={0}
          maxValue={20}
          label="Please wait..."
          fullWidth={true}
          getValueLabel={({ value, max }) => `Processing ${value} of ${max}`}
        />
      </div>
    </div>
  );
};

export default ProgressBarsExample;
