export * from "./numbers";
export * from "./options";

import { options } from "./options";

export const filterOptions = options.filter(
  (option) => option.key >= 1 && option.key <= 36
);

export const zeroOptions = options[0];

export const cols = options.filter(
  (option) => option.key >= 37 && option.key <= 39
);

export const firstLine = options.filter(
  (option) => option.key >= 40 && option.key <= 42
);

export const secondLine = options.filter(
  (option) => option.key === 43 || option.key === 45
);

export const square = options.filter(
  (option) => option.key === 47 || option.key === 48
);

export const secondLineThird = options.filter(
  (option) => option.key === 46 || option.key === 44
);
