export type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

export type SelectChangeEvent = Event & {
  currentTarget: HTMLSelectElement;
  target: HTMLSelectElement;
};

export type FormControlChangeEvent = Event & {
  currentTarget: FormControlElement;
  target: FormControlElement;
};
