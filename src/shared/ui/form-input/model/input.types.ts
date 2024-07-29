import { ComboboxTriggerMode } from '@kobalte/core/combobox';
import { SliderGetValueLabelParams } from '@kobalte/core/slider';
import { JSX, Setter } from 'solid-js';

export type CheckboxInputProps = {
  name: string;
  value: string;
  checked: boolean | undefined;
  defaultChecked?: boolean;
  onChange: (checked: boolean) => void | Setter<boolean>;
  label?: string;
  required?: boolean;
  description?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
};

export type TextInputProps = {
  type: 'text' | 'textarea';
  name: string;
  value: string | null;
  defaultValue?: string;
  onChange: (value: string | null) => void | Setter<string | null>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoResize?: boolean;
  className?: string;
};

export type NumberRangeSliderProps = {
  name: string;
  value: number[];
  defaultValue?: number[];
  onChange: (value: number[]) => void | Setter<number[]>;
  onChangeEnd?: (value: number[]) => void | Setter<number[]>;
  label?: string;
  multiple?: boolean;
  inverted?: boolean;
  minValue?: number;
  maxValue?: number;
  step?: number;
  minStepsBetweenThumbs?: number;
  getValueLabel?: (params: SliderGetValueLabelParams) => string;
  orientation?: 'horizontal' | 'vertical';
  required?: boolean;
  description?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
};

export type SelectInputProps<T> = {
  name: string;
  value: T | undefined;
  defaultValue?: T;
  onChange: (value: T | null) => void | Setter<T | null>;
  options: T[];
  optionValue: keyof T;
  optionTextValue: keyof T;
  optionDisabled: (option: T) => boolean;
  placeholder: string;
  triggerLabel: string;
  triggerIcon?: JSX.Element;
  required?: boolean;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
};

export type SelectMultipleInputProps<T> = {
  name: string;
  value: T[] | undefined;
  defaultValue?: T[];
  onChange: (value: T[] | null) => void | Setter<T[] | null>;
  options: T[];
  optionValue: keyof T;
  optionTextValue: keyof T;
  optionDisabled: (option: T) => boolean;
  placeholder: string;
  triggerLabel: string;
  triggerIcon?: JSX.Element;
  required?: boolean;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
};

type ComboboxBaseProps<T> = {
  options: T[];
  optionValue: keyof T;
  optionTextValue: keyof T;
  optionLabel: keyof T;
  optionDisabled: (option: T) => boolean;
  placeholder: string;
  triggerLabel: string;
  triggerIcon?: JSX.Element;
  required?: boolean;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  defaultFilter?: 'startsWith' | 'endsWith' | 'contains';
  className?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, triggerMode?: ComboboxTriggerMode) => void;
  onInputChange?: (value: string) => void;
  removeOnBackspace?: boolean;
  allowDuplicateSelectionEvents?: boolean;
  disallowEmptySelection?: boolean;
  closeOnSelection?: boolean;
  selectionBehavior?: 'toggle' | 'replace';
  virtualized?: boolean;
  modal?: boolean;
  preventScroll?: boolean;
};

export type ComboboxInputProps<T> = {
  name: string;
  value: T | undefined;
  defaultValue?: T;
  onChange: (value: T) => void | Setter<T>;
} & ComboboxBaseProps<T>;

export type ComboboxMultipleInputProps<T> = {
  name: string;
  value: T[] | undefined;
  defaultValue?: T[];
  onChange: (value: T[]) => void | Setter<T[]>;
  options: T[];
} & ComboboxBaseProps<T>;
