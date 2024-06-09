import { JSX } from 'solid-js';

export type TextInputProps = {
  name: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date' | 'hidden';
  label?: string;
  placeholder?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  ref: (element: HTMLInputElement) => void;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
};

export type TextareaInputProps = {
  name: string;
  label?: string;
  rows?: number;
  placeholder?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  ref: (element: HTMLTextAreaElement) => void;
  onInput: JSX.EventHandler<HTMLTextAreaElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLTextAreaElement, Event>;
  onBlur: JSX.EventHandler<HTMLTextAreaElement, FocusEvent>;
};

export type CheckboxInputProps = {
  name: string;
  type: 'checkbox';
  label?: string;
  checked: boolean | undefined;
  error: string;
  required?: boolean;
  ref: (element: HTMLInputElement) => void;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
};
