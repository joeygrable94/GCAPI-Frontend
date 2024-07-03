import { Slider } from '@kobalte/core/slider';
import { Show } from 'solid-js';
import { NumberRangeSliderProps } from '~/shared/ui/form-input';

export default function NumberRangeSlider(props: NumberRangeSliderProps) {
  return (
    <>
      <Slider
        class={`slider relative flex w-auto min-w-52 touch-none select-none flex-col items-center gap-2 ${props.className ?? ''}`}
        name={props.name}
        value={props.value}
        defaultValue={props.defaultValue}
        inverted={props.inverted}
        minValue={props.minValue}
        maxValue={props.maxValue}
        step={props.step}
        minStepsBetweenThumbs={props.minStepsBetweenThumbs}
        getValueLabel={props.getValueLabel}
        orientation={props.orientation}
        validationState={props.error ? 'invalid' : 'valid'}
        required={props.required}
        disabled={props.disabled}
        readOnly={props.readOnly}
        onChange={props.onChange}
        onChangeEnd={props.onChangeEnd}
      >
        <div class="slider-label flex w-full justify-between">
          <Show when={props.label}>
            <Slider.Label class="slider-label__text">
              {props.label} {props.required && <span class="text-red-700">*</span>}
            </Slider.Label>
          </Show>
          <Slider.ValueLabel class="slider-label__value" />
        </div>
        <Slider.Track class="slider-track relative h-2 w-full rounded-full bg-gray-300">
          <Slider.Fill class="slider-range absolute h-full rounded-full bg-blue-500 ui-invalid:bg-red-600" />
          <Slider.Thumb class="slider-thumb focus:outline-3 -top-1 block h-4 w-4 rounded-full bg-blue-500 hover:shadow-sm focus:shadow-sm focus:outline focus:outline-blue-300 ui-invalid:bg-red-600 ui-invalid:focus:outline-red-300">
            <Slider.Input />
          </Slider.Thumb>
          <Show when={props.multiple || props.value.length > 1}>
            <Slider.Thumb class="slider-thumb slider-thumb focus:outline-3 -top-1 block h-4 w-4 rounded-full bg-blue-500 hover:shadow-sm focus:shadow-sm focus:outline focus:outline-blue-300 ui-invalid:bg-red-600 ui-invalid:focus:outline-red-300">
              <Slider.Input />
            </Slider.Thumb>
          </Show>
        </Slider.Track>
        <Show when={props.description}>
          <span class="block w-full select-none py-1 text-sm">{props.description}</span>
        </Show>
        <Show when={props.error}>
          <span class="block w-full select-none py-1 text-sm text-red-700">
            {props.error}
          </span>
        </Show>
      </Slider>
    </>
  );
}
